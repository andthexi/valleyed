import { merge as differMerge } from '../utils/differ'
import { getRandomValue, wrapInTryCatch } from '../utils/functions'
import { JSONRedacted } from '../utils/types'
import type { Pipe, PipeInput, PipeOutput } from './base'
import { compileNested, context, define, schema, standard, validate } from './base/pipes'

export const or = <T extends Pipe<any, any>[]>(branches: T) => {
	const validatedVarname = `validated_${getRandomValue()}`
	const errorsVarname = `errors_${getRandomValue()}`
	return standard<PipeInput<T[number]>, PipeOutput<T[number]>>(
		({ input }, opts) =>
			branches.length === 0
				? []
				: [
						`const ${errorsVarname} = []`,
						`let ${validatedVarname}`,
						...branches
							.map((branch, idx) => (lines: string[]) => [
								`${validatedVarname} = ${input}`,
								...compileNested({
									opts: { ...opts, failEarly: true },
									pipe: branch,
									input: validatedVarname,
									errorType: 'assign',
									key: validatedVarname,
								}),
								`if (${validatedVarname} instanceof PipeError) {`,
								`	${errorsVarname}.push(PipeError.path(${idx}, '${validatedVarname}', ${validatedVarname}))`,
								...lines.map((l) => `	${l}`),
								idx === branches.length - 1
									? `	${opts.wrapError.format(`PipeError.rootFrom(${errorsVarname})`)}`
									: '',
								`}`,
								`else ${input} = ${validatedVarname}`,
							])
							.reduceRight<string[]>((acc, cur) => cur(acc), []),
						opts.wrapError(`${input} instanceof PipeError`, input),
					],
		{
			schema: () => ({ oneOf: branches.map((branch) => schema(branch)) }),
		},
	)
}

export const merge = <T1 extends Pipe<any, any>, T2 extends Pipe<any, any>>(branch1: T1, branch2: T2) => {
	const inputVarname = `input_${getRandomValue()}`
	return standard<PipeInput<T1> & PipeInput<T2>, PipeOutput<T1> & PipeOutput<T2>>(
		({ input, context }, opts) => [
			`let ${inputVarname}A = ${input}`,
			`let ${inputVarname}B = ${input}`,
			...compileNested({ opts, pipe: branch1, input: `${inputVarname}A` }),
			opts.wrapError(`${inputVarname}A instanceof PipeError`, `${inputVarname}A`),
			...compileNested({ opts, pipe: branch2, input: `${inputVarname}B` }),
			opts.wrapError(`${inputVarname}B instanceof PipeError`, `${inputVarname}B`),
			`${input} = ${context}.differMerge(${inputVarname}A, ${inputVarname}B)`,
		],
		{
			context: { differMerge },
			schema: () => ({ allOf: [schema(branch1), schema(branch2)] }),
		},
	)
}

export const discriminate = <T extends Record<PropertyKey, Pipe<any, any>>>(
	discriminator: (val: PipeInput<T[keyof T]>) => PropertyKey,
	branches: T,
	err = 'doesnt match any of the schema',
) =>
	standard<PipeInput<T[keyof T]>, PipeOutput<T[keyof T]>>(
		({ input, context, path }, opts) => [
			`switch (${context}.wrapInTryCatch(() => ${context}.discriminator(${input}))) {`,
			...Object.entries(branches).flatMap(([key, branch]) => [
				`	case ('${key}'): {`,
				...compileNested({ opts, pipe: branch, input }).map((l) => `		${l}`),
				`		break`,
				`	}`,
			]),
			`	default: ${opts.wrapError.format(`PipeError.root("${err}", ${input}, ${path})`)}`,
			`}`,
		],
		{
			context: { wrapInTryCatch, discriminator },
			schema: () => ({ oneOf: Object.values(branches).map((s) => schema(s)) }),
		},
	)

export const fromJson = <T extends Pipe<any, any>>(branch: T) => {
	const validatedVarname = `validated_${getRandomValue()}`
	return standard<PipeInput<T>, PipeOutput<T>>(
		({ input, context }, opts) => [
			`let ${validatedVarname} = ${input}`,
			`if (${validatedVarname}?.constructor?.name === 'String') ${validatedVarname} = ${context}.wrapInTryCatch(() => JSON.parse(${input}), ${validatedVarname})`,
			...compileNested({ opts, pipe: branch, input: validatedVarname, errorType: 'assign' }),
			`${input} = ${validatedVarname}`,
		],
		{
			context: { ...context(branch), wrapInTryCatch },
			schema: branch.schema,
		},
	)
}

type JSONRedactable<T> = T extends JSONRedacted<infer U> ? U : T

export const jsonRedacted = <T extends Pipe<any, any>>(branch: T) =>
	standard<PipeInput<T>, JSONRedacted<JSONRedactable<PipeOutput<T>>>>(
		({ input, context }, opts) => [
			...compileNested({ pipe: branch, input, opts }),
			`${input} = ${context}.JSONRedacted.from(${input})`,
		],
		{
			schema: () => ({}),
			context: { ...context(branch), jsonRedacted: true, JSONRedacted },
		},
	)

export const lazy = <T extends Pipe<any, any>>(pipeFn: () => T) =>
	define<PipeInput<T>, PipeOutput<T>>(
		(input) => {
			const result = validate(pipeFn(), input)
			return result.valid ? result.value : result.error
		},
		{
			schema: () => schema(pipeFn()),
		},
	)

export const recursive = <T extends Pipe<any, any>>(pipeFn: () => T, $refId: string) => {
	const fnVarname = `fn_${getRandomValue()}`
	let compiledBefore = false
	let schemedBefore = false
	return standard<PipeInput<T>, PipeOutput<T>>(
		({ input }, opts) => {
			const common = [`${input} = ${fnVarname}(${input})`, opts.wrapError(`${input} instanceof PipeError`, input)]
			compiledBefore = !compiledBefore
			if (!compiledBefore) return common
			return [
				`function ${fnVarname}(node) {`,
				...compileNested({
					opts: { ...opts, failEarly: true },
					pipe: pipeFn(),
					input: 'node',
					errorType: 'return',
				}).map((l) => `	${l}`),
				`	return node`,
				'}',
				...common,
			]
		},
		{
			schema: () => {
				schemedBefore = !schemedBefore
				if (!schemedBefore) return { $refId }
				return schema(pipeFn(), { $refId })
			},
		},
	)
}
