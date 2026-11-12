import { getRandomValue } from '../utils/functions'
import type { PipeInput, Pipe, PipeOutput } from './base'
import { standard, schema, compileNested } from './base/pipes'

export const array = <T extends Pipe<any, any>>(branch: T, err = 'is not an array') => {
	const errorsVarname = `errors_${getRandomValue()}`
	const resVarname = `res_${getRandomValue()}`
	const validatedVarname = `validated_${getRandomValue()}`
	return standard<PipeInput<T>[], PipeOutput<T>[]>(
		({ input, path }, opts) => [
			opts.wrapError(`!Array.isArray(${input})`, `PipeError.root('${err}', ${input}, ${path})`),
			opts.failEarly ? '' : `const ${errorsVarname} = []`,
			`const ${resVarname} = []`,
			`let ${validatedVarname}`,
			`for (let idx = 0; idx < ${input}.length; idx++) {`,
			`	${validatedVarname} = ${input}[idx]`,
			...compileNested({
				opts,
				pipe: branch,
				input: validatedVarname,
				errorType: 'assign',
				key: validatedVarname,
			}),
			opts.failEarly
				? `if (${validatedVarname} instanceof PipeError) ${opts.wrapError.format(`PipeError.path(idx, '${validatedVarname}', ${validatedVarname})`)}`
				: `	if (${validatedVarname} instanceof PipeError) ${errorsVarname}.push(PipeError.path(idx, '${validatedVarname}', ${validatedVarname}))`,
			`	else ${resVarname}[idx] = ${validatedVarname}`,
			`}`,
			opts.failEarly ? '' : opts.wrapError(`${errorsVarname}.length`, `PipeError.rootFrom(${errorsVarname})`),
			opts.wrapError(`${input} instanceof PipeError`, `${input}`),
			`${input} = ${resVarname}`,
		],
		{
			schema: () => ({ type: 'array', items: schema(branch) }),
		},
	)
}

export const tuple = <T extends ReadonlyArray<Pipe<any, any>>>(branches: readonly [...T], err = 'is not an array') => {
	const errorsVarname = `errors_${getRandomValue()}`
	const resVarname = `res_${getRandomValue()}`
	const validatedVarname = `validated_${getRandomValue()}`
	return standard<{ [K in keyof T]: PipeInput<T[K]> }, { [K in keyof T]: PipeOutput<T[K]> }>(
		({ input, path }, opts) => [
			opts.wrapError(`!Array.isArray(${input})`, `PipeError.root('${err}', ${input}, ${path})`),
			...(branches.length === 0
				? []
				: [
						`const ${resVarname} = []`,
						opts.failEarly ? '' : `const ${errorsVarname} = []`,
						...branches.flatMap((branch, idx) => [
							`let ${validatedVarname}${idx} = ${input}[${idx}]`,
							...compileNested({
								opts,
								pipe: branch,
								input: `${validatedVarname}${idx}`,
								key: `${idx}`,
								errorType: 'assign',
							}),
							opts.failEarly
								? opts.wrapError(
										`${validatedVarname}${idx} instanceof PipeError`,
										`${validatedVarname}${idx}`,
									)
								: `	if (${validatedVarname}${idx} instanceof PipeError) ${errorsVarname}.push(${validatedVarname}${idx})`,
							`if (!(${validatedVarname}${idx} instanceof PipeError)) ${resVarname}[${idx}] = ${validatedVarname}${idx}`,
						]),
						opts.failEarly
							? ''
							: opts.wrapError(`${errorsVarname}.length`, `PipeError.rootFrom(${errorsVarname})`),
						`${input} = ${resVarname}`,
					]),
		],
		{
			schema: () => ({
				type: 'array',
				items: branches.map((pipe) => schema(pipe)),
				minItems: branches.length,
				maxItems: branches.length,
			}),
		},
	)
}

export const asSet = <T>(keyFn: (i: T) => PropertyKey = (v) => v as string) => {
	const varname = `obj_${getRandomValue()}`
	return standard<T[], T[]>(
		({ input, context }) => [
			`const ${varname} = {}`,
			`${input} = ${input}.reduce((acc, cur) => {`,
			`	const key = ${context}.keyFn(cur)`,
			`	if (!${varname}[key]) {`,
			`		${varname}[key] = true`,
			`		acc.push(cur)`,
			`	}`,
			`	return acc`,
			`}, [])`,
		],
		{
			context: { keyFn },
		},
	)
}
