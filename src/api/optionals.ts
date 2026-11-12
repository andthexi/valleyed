import type { DeepPartial } from '../utils/types'
import type { Pipe, PipeInput, PipeOutput } from './base'
import { compileNested, context, schema, standard } from './base/pipes'

const partial = <T extends Pipe<any, any>, P>(
	branch: T,
	partialCondition: (i: unknown) => boolean,
	config: Parameters<typeof standard<PipeInput<T> | P, PipeOutput<T> | P>>[1],
) =>
	standard<PipeInput<T> | P, PipeOutput<T> | P>(
		({ input, context }, opts) => [
			`if (!${context}.partialCondition(${input})) {`,
			...compileNested({ opts, pipe: branch, input }).map((l) => `  ${l}`),
			`}`,
		],
		{
			...config,
			context: { ...config?.context, partialCondition },
		},
	)

export const nullable = <T extends Pipe<any, any>>(branch: T) =>
	partial<T, null>(branch, (i) => i === null, {
		schema: () => ({ oneOf: [schema(branch), { type: 'null' }] }),
	})

export const optional = <T extends Pipe<any, any>>(branch: T) =>
	partial<T, undefined>(branch, (i) => i === undefined, {
		context: { optional: true },
		schema: () => schema(branch),
	})

export const nullish = <T extends Pipe<any, any>>(branch: T) =>
	partial<T, null | undefined>(branch, (i) => i === null || i === undefined, {
		schema: () => ({ oneOf: [schema(branch), { type: 'null' }] }),
		context: { ...context(branch), optional: true },
	})

export const conditional = <T extends Pipe<any, any>>(branch: T, condition: () => boolean) =>
	partial<T, never>(branch, () => !condition(), {
		schema: () => schema(branch),
		context: { ...context(branch), optional: true },
	})

type DefaultValue<T> = T extends object ? DeepPartial<T> : T

export const defaults = <T extends Pipe<any, any>>(branch: T, def: DefaultValue<PipeInput<T>>) =>
	standard<PipeInput<T> | undefined, Exclude<PipeOutput<T>, undefined>>(
		({ input, context }, opts) => [
			`if (${input} === undefined) ${input} = ${context}.defaults`,
			...compileNested({ opts, pipe: branch, input }),
		],
		{
			schema: (c) => ({ ...schema(branch), default: c.defaults ?? def }),
			context: { ...context(branch), defaults: def, optional: true },
		},
	)

const onCatch = <T extends Pipe<any, any>>(branch: T, def: DefaultValue<PipeInput<T>>) =>
	standard<PipeInput<T>, PipeOutput<T>>(
		({ input, context }, opts) => [
			...compileNested({ opts, pipe: branch, input, errorType: 'assign' }),
			`if (${input} instanceof PipeError) ${input} = ${context}.catch`,
		],
		{
			schema: (c) => ({ ...schema(branch), default: c.catch ?? def }),
			context: { ...context(branch), catch: def },
		},
	)

export { onCatch as catch }
