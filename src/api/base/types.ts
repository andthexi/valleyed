import type { StandardSchemaV1 } from '@standard-schema/spec'

import type { JsonSchema } from '../../utils/types'
import type { PipeError } from './errors'

export type PipeFn<I, O> = (input: I) => O | PipeError
export type PipeCompiledFn<T extends Pipe<any, any>> = (input: unknown) => PipeOutput<T> | PipeError
export type PipeErrorHandlerType = 'return' | 'throw' | 'assign'
export type PipeErrorHandler = ((errorCondition: string, error: string) => (lines: string[]) => string[]) & {
	type: PipeErrorHandlerType
	format: (error: string) => string
}

export type PipeInput<T> = T extends Pipe<infer I, any> ? I : never
export type PipeOutput<T> = T extends Pipe<any, infer O> ? O : never
export type PipeMeta = Pick<JsonSchema, '$refId' | 'title' | 'description' | 'examples' | 'default'>
export type Context = Record<string, any>
export type JsonSchemaBuilder = JsonSchema

export type Entry<I, O> = Pipe<I, O> | PipeFn<I, O>
type PipeChain<I, O> = {
	<T1>(fn1: Entry<O, T1>): Pipe<I, T1>
	<T1, T2>(fn1: Entry<O, T1>, fn2: Entry<T1, T2>): Pipe<I, T2>
	<T1, T2, T3>(fn1: Entry<O, T1>, fn2: Entry<T1, T2>, f3: Entry<T2, T3>): Pipe<I, T3>
	<T1, T2, T3, T4>(fn1: Entry<O, T1>, fn2: Entry<T1, T2>, f3: Entry<T2, T3>, f4: Entry<T3, T4>): Pipe<I, T4>
	<T1, T2, T3, T4, T5>(
		fn1: Entry<O, T1>,
		fn2: Entry<T1, T2>,
		f3: Entry<T2, T3>,
		f4: Entry<T3, T4>,
		f5: Entry<T4, T5>,
	): Pipe<I, T5>
	<T1, T2, T3, T4, T5, T6>(
		fn1: Entry<O, T1>,
		fn2: Entry<T1, T2>,
		f3: Entry<T2, T3>,
		f4: Entry<T3, T4>,
		f5: Entry<T4, T5>,
		f6: Entry<T5, T6>,
	): Pipe<I, T6>
	<T1, T2, T3, T4, T5, T6, T7>(
		fn1: Entry<O, T1>,
		fn2: Entry<T1, T2>,
		f3: Entry<T2, T3>,
		f4: Entry<T3, T4>,
		f5: Entry<T4, T5>,
		f6: Entry<T5, T6>,
		f7: Entry<T6, T7>,
	): Pipe<I, T7>
	<T1, T2, T3, T4, T5, T6, T7, T8>(
		fn1: Entry<O, T1>,
		fn2: Entry<T1, T2>,
		f3: Entry<T2, T3>,
		f4: Entry<T3, T4>,
		f5: Entry<T4, T5>,
		f6: Entry<T5, T6>,
		f7: Entry<T6, T7>,
		f8: Entry<T7, T8>,
	): Pipe<I, T8>
	<T1, T2, T3, T4, T5, T6, T7, T8, T9>(
		fn1: Entry<O, T1>,
		fn2: Entry<T1, T2>,
		f3: Entry<T2, T3>,
		f4: Entry<T3, T4>,
		f5: Entry<T4, T5>,
		f6: Entry<T5, T6>,
		f7: Entry<T6, T7>,
		f8: Entry<T7, T8>,
		f9: Entry<T8, T9>,
	): Pipe<I, T9>
	<T1, T2, T3, T4, T5, T6, T7, T8, T9, T10>(
		fn1: Entry<O, T1>,
		fn2: Entry<T1, T2>,
		f3: Entry<T2, T3>,
		f4: Entry<T3, T4>,
		f5: Entry<T4, T5>,
		f6: Entry<T5, T6>,
		f7: Entry<T6, T7>,
		f8: Entry<T7, T8>,
		f9: Entry<T8, T9>,
		f10: Entry<T9, T10>,
	): Pipe<I, T10>
}

type Arrayable<T> = T | T[]

export interface Pipe<I, O> extends StandardSchemaV1<I, O> {
	readonly context: () => Context
	readonly schema: (context: Context) => JsonSchema
	readonly pipe: PipeChain<I, O>
	readonly compile: (
		names: { input: string; context: string; path: string },
		opts: { rootContext: Context; failEarly: boolean; path: string; wrapError: PipeErrorHandler },
	) => Arrayable<string | ReturnType<PipeErrorHandler>>
	prev?: Pipe<any, any>
	__compiled?: PipeCompiledFn<any>
}
