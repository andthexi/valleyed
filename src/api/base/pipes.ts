import { createErrorHandler, PipeError } from './errors'
import type {
	Context,
	Entry,
	JsonSchemaBuilder,
	Pipe,
	PipeCompiledFn,
	PipeErrorHandler,
	PipeFn,
	PipeMeta,
	PipeOutput,
} from './types'
import { getRandomValue } from '../../utils/functions'
import type { JsonSchema } from '../../utils/types'

export function walk<T>(pipe: Pipe<any, any>, init: T, nodeFn: (cur: Pipe<any, any>, acc: T) => T) {
	let acc: T = init
	const pipes: Pipe<any, any>[] = [pipe]
	while (pipe) {
		const prev = pipe.prev
		if (!prev) break
		pipes.push(prev)
		pipe = prev
	}
	for (const pipe of pipes.reverse()) acc = nodeFn(pipe, acc)
	return acc
}

export function context<T extends Pipe<any, any>>(pipe: T): Context {
	return walk(pipe, {} as Context, (p, acc) => ({ ...acc, ...p.context() }))
}

export function assert<T extends Pipe<any, any>>(pipe: T, input: unknown): PipeOutput<T> {
	const result = validate(pipe, input)
	if (!result.valid) throw result.error
	return result.value
}

export function validate<T extends Pipe<any, any>>(
	pipe: T,
	input: unknown,
): { value: PipeOutput<T>; valid: true } | { error: PipeError; valid: false } {
	try {
		const fn = pipe.__compiled ?? compile(pipe)
		const res = fn(input) as ReturnType<PipeCompiledFn<T>>
		return res instanceof PipeError ? { error: res, valid: false } : { value: res, valid: true }
	} catch (error) {
		if (error instanceof PipeError) return { error, valid: false }
		return {
			error: PipeError.root(error instanceof Error ? error.message : `${error}`, input, undefined),
			valid: false,
		}
	}
}

export function schema<T extends Pipe<any, any>>(pipe: T, schema: JsonSchema = {}): JsonSchema {
	const cont = context(pipe)
	return walk(pipe, schema, (p, acc) => ({ ...acc, ...p.schema(cont) }))
}

export function meta<T extends Pipe<any, any>>(p: T, meta: PipeMeta): T {
	return p.pipe(standard(() => [], { schema: () => meta })) as T
}

export function compile<T extends Pipe<any, any>>(pipe: T, opts: { allErrors?: boolean } = {}): PipeCompiledFn<T> {
	const inputStr = 'input'
	const contextStr = 'context'
	const { lines, context } = compilePipeToString({
		pipe,
		input: inputStr,
		context: contextStr,
		failEarly: !opts.allErrors,
		base: [`return ${inputStr}`],
	})
	const allLines = [
		`return (${inputStr}) => {`,
		...lines.filter((l) => l.trim() !== '').map((l) => `\t${l}`),
		`	throw PipeError.root('unhandled root validation', ${inputStr})`,
		`}`,
	]
	pipe.__compiled = new Function(contextStr, 'PipeError', allLines.join('\n'))(context, PipeError)
	return pipe.__compiled!
}

export function standard<I, O>(
	compile: Pipe<I, O>['compile'],
	config: {
		context?: Context
		schema?: (context: Context) => JsonSchemaBuilder
	} = {},
): Pipe<I, O> {
	const piper: Pipe<I, O> = {
		context: () => config.context ?? ({} as any),
		schema: (context: Context) => config.schema?.(context) ?? ({} as any),
		pipe: (...entries: Entry<any, any>[]) => {
			delete piper.__compiled
			let pipe = piper
			for (const cur of entries) {
				const p = typeof cur === 'function' ? define(cur, config) : cur
				p.prev = pipe
				pipe = p
			}
			return pipe
		},
		compile,
		'~standard': {
			version: 1,
			vendor: 'valleyed',
			validate(value) {
				const validity = validate(piper, value)
				if (validity.valid) return { value: validity.value }
				return {
					issues: validity.error.messages.map(({ message, path }) => ({
						message,
						path: path ? path.split('.') : undefined,
					})),
				}
			},
		},
	}
	return piper
}

export function define<I, O>(
	fn: PipeFn<I, O>,
	config: {
		context?: Context
		schema?: (context: Context) => JsonSchemaBuilder
	} = {},
): Pipe<I, O> {
	const key = `define_${getRandomValue()}`
	return standard<I, O>(
		({ input, context, path }, opts) => [
			`${input} = ${context}['${key}'](${input})`,
			opts.wrapError(`${input} instanceof PipeError`, `PipeError.wrap(${path}, ${input})`),
		],
		{
			context: { ...config?.context, [key]: fn },
			schema: config?.schema,
		},
	)
}

export function compileNested(
	data: {
		pipe: Pipe<any, any>
		errorType?: Parameters<typeof createErrorHandler>[1]
		opts: Required<
			Pick<Parameters<Pipe<any, any>['compile']>[1], 'rootContext' | 'failEarly' | 'path' | 'wrapError'>
		>
	} & { input: string; key?: string },
) {
	const random = getRandomValue()
	const { lines, context } = compilePipeToString({
		...data.opts,
		wrapError: createErrorHandler(data.input, data.errorType ?? data.opts.wrapError.type),
		pipe: data.pipe,
		input: data.input,
		context: `context[\`${random}\`]`,
		path: [data.opts.path, 'key' in data ? data.key : ''].filter(Boolean).join('.') || undefined,
	})
	data.opts.rootContext[random] = context
	return lines
}

function compilePipeToString({
	pipe,
	input,
	context: contextStr,
	failEarly = false,
	path = '',
	rootContext,
	wrapError = createErrorHandler(input, 'return'),
	base = [],
}: {
	pipe: Pipe<any, any>
	input: string
	context: string
	failEarly?: boolean
	path?: string
	rootContext?: Context
	wrapError?: PipeErrorHandler
	base?: string[]
}) {
	const ctx = context(pipe)
	rootContext ??= ctx
	const compiled = walk(pipe, <ReturnType<Pipe<any, any>['compile']>[]>[], (p, acc) => {
		acc.push(
			p.compile(
				{ input, context: contextStr, path: `${path ? `'${path}'` : undefined}` },
				{ rootContext, failEarly, path, wrapError },
			),
		)
		return acc
	})
	const lines = mergePipeLines(base, compiled.flat())
	return { lines, context: ctx }
}

function mergePipeLines(base: string[], lines: ReturnType<Pipe<any, any>['compile']>) {
	return (Array.isArray(lines) ? lines : [lines]).reduceRight<string[]>((acc, cur) => {
		if (typeof cur === 'string') acc.unshift(cur)
		else if (typeof cur === 'function') acc = cur(acc)
		return acc
	}, base)
}
