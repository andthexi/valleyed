import type { PipeInput, PipeOutput, Pipe } from './base'
import { compileNested, context, schema, standard } from './base/pipes'
import { getRandomValue } from '../utils/functions'

type ObjectPipe<T extends Record<string, Pipe<any, any>>> = Pipe<
	{ [K in keyof T]: PipeInput<T[K]> },
	{ [K in keyof T]: PipeOutput<T[K]> }
>

const objCompile: (branches: Record<string, Pipe<any, any>>) => Parameters<typeof standard>[0] =
	(branches) =>
	({ input, path }, opts) => {
		const resVarname = `res_${getRandomValue()}`
		const errorsVarname = `errors_${getRandomValue()}`
		const validatedVarname = `validated_${getRandomValue()}`
		return [
			opts.wrapError(
				`typeof ${input} !== 'object' || ${input} === null || Array.isArray(${input})`,
				`PipeError.root('is not an object', ${input}, ${path})`,
			),
			`const ${resVarname} = {}`,
			opts.failEarly ? '' : `const ${errorsVarname} = []`,
			`let ${validatedVarname}`,
			...Object.entries(branches).flatMap(([k, branch]) => [
				`${validatedVarname} = ${input}['${k}']`,
				...compileNested({ opts, pipe: branch, input: validatedVarname, key: k, errorType: 'assign' }),
				opts.failEarly
					? opts.wrapError(`${validatedVarname} instanceof PipeError`, validatedVarname)
					: `if (${validatedVarname} instanceof PipeError) ${errorsVarname}.push(${validatedVarname})`,
				`${resVarname}['${k}'] = ${validatedVarname}`,
			]),
			opts.failEarly ? '' : opts.wrapError(`${errorsVarname}.length`, `PipeError.rootFrom(${errorsVarname})`),
			`${input} = ${resVarname}`,
		]
	}

export const object = <T extends Record<string, Pipe<any, any>>>(branches: T) =>
	standard<PipeInput<ObjectPipe<T>>, PipeOutput<ObjectPipe<T>>>(objCompile(branches), {
		schema: () => ({
			type: 'object',
			properties: Object.fromEntries(
				Object.entries(branches ?? {})
					.filter(([_, pipe]) => !context(pipe).jsonRedacted)
					.map(([key, pipe]) => [key, schema(pipe)]),
			),
			required: Object.entries(branches ?? {})
				.filter(([, pipe]) => !context(pipe).optional && !context(pipe).jsonRedacted)
				.map(([key]) => key),
			additionalProperties: false,
		}),
		context: { branches },
	})

export const objectPick = <
	T extends ObjectPipe<Record<string, Pipe<any, any>>>,
	S extends ReadonlyArray<keyof PipeInput<T> & string>,
>(
	branch: T,
	keys: S,
) => {
	const ctx = context(branch)
	const sch = schema(branch)
	const branches = Object.fromEntries(
		Object.entries((ctx.branches as Record<string, Pipe<any, any>>) ?? {}).filter(([key]) =>
			keys.includes(key as S[number]),
		),
	)
	return standard<Pick<PipeInput<T>, S[number]>, Pick<PipeOutput<T>, S[number]>>(objCompile(branches), {
		schema: () => ({
			...sch,
			properties: Object.fromEntries(
				Object.entries(sch.properties ?? {}).filter(([key]) => keys.includes(key as S[number])),
			),
			required: (sch.required ?? []).filter((key) => keys.includes(key as S[number])),
		}),
		context: { ...ctx, branches },
	})
}

export const objectOmit = <
	T extends ObjectPipe<Record<string, Pipe<any, any>>>,
	S extends ReadonlyArray<keyof PipeInput<T> & string>,
>(
	branch: T,
	keys: S,
) => {
	const ctx = context(branch)
	const sch = schema(branch)
	const branches = Object.fromEntries(
		Object.entries((ctx.branches as Record<string, Pipe<any, any>>) ?? {}).filter(
			([key]) => !keys.includes(key as S[number]),
		),
	)
	return standard<Omit<PipeInput<T>, S[number]>, Omit<PipeOutput<T>, S[number]>>(objCompile(branches), {
		schema: () => ({
			...sch,
			properties: Object.fromEntries(
				Object.entries(sch.properties ?? {}).filter(([key]) => !keys.includes(key as S[number])),
			),
			required: (sch.required ?? []).filter((key) => !keys.includes(key as S[number])),
		}),
		context: { ...ctx, branches },
	})
}

export const record = <K extends Pipe<any, PropertyKey>, V extends Pipe<any, any>>(kPipe: K, vPipe: V) => {
	const kValidatedVarname = `kValidated_${getRandomValue()}`
	const vValidatedVarname = `vValidated_${getRandomValue()}`
	const resVarname = `res_${getRandomValue()}`
	const errorsVarname = `errors_${getRandomValue()}`
	return standard<Record<PipeInput<K>, PipeInput<V>>, Record<PipeOutput<K>, PipeOutput<V>>>(
		({ input, path }, opts) => [
			opts.wrapError(
				`typeof ${input} !== 'object' || ${input} === null || Array.isArray(${input})`,
				`PipeError.root(['is not an object'], ${input}, ${path})`,
			),
			`const ${resVarname} = {}`,
			opts.failEarly ? '' : `const ${errorsVarname} = []`,
			`for (let [k, v] of Object.entries(${input})) {`,
			...[
				`let ${kValidatedVarname} = k`,
				`let ${vValidatedVarname} = v`,
				...compileNested({
					opts,
					pipe: kPipe,
					input: kValidatedVarname,
					errorType: 'assign',
					key: kValidatedVarname,
				}),
				opts.failEarly
					? opts.wrapError(
							`${kValidatedVarname} instanceof PipeError`,
							`PipeError.path(k, '${kValidatedVarname}', ${kValidatedVarname})`,
						)
					: `	if (${kValidatedVarname} instanceof PipeError) ${errorsVarname}.push(PipeError.path(k, '${kValidatedVarname}', ${kValidatedVarname}))`,
				...compileNested({
					opts,
					pipe: vPipe,
					input: vValidatedVarname,
					errorType: 'assign',
					key: kValidatedVarname,
				}),
				opts.failEarly
					? opts.wrapError(
							`${vValidatedVarname} instanceof PipeError`,
							`PipeError.path(k, '${kValidatedVarname}', ${vValidatedVarname})`,
						)
					: `	if (${vValidatedVarname} instanceof PipeError) ${errorsVarname}.push(PipeError.path(k, '${kValidatedVarname}', ${vValidatedVarname}))`,
				`	if (!(${kValidatedVarname} instanceof PipeError) && !(${vValidatedVarname} instanceof PipeError)) ${resVarname}[${kValidatedVarname}] = ${vValidatedVarname};`,
			],
			`}`,
			opts.failEarly ? '' : opts.wrapError(`${errorsVarname}.length`, `PipeError.rootFrom(${errorsVarname})`),
			`${input} = ${resVarname}`,
		],
		{
			schema: () => ({
				type: 'object',
				propertyNames: schema(kPipe),
				additionalProperties: schema(vPipe),
			}),
		},
	)
}

export const asMap = <K extends PropertyKey, V>() =>
	standard<Record<K, V>, Map<K, V>>(({ input }) => [`${input} = new Map(Object.entries(${input}))`])
