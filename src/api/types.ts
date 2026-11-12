import { standard } from './base/pipes'

const isString = (err = 'is not a string') =>
	standard<string, string>(
		({ input, path }, opts) =>
			opts.wrapError(
				`typeof ${input} !== 'string' && ${input}?.constructor?.name !== 'String'`,
				`PipeError.root('${err}', ${input}, ${path})`,
			),
		{
			schema: () => ({ type: 'string' }),
		},
	)

const isNumber = (err = 'is not a number') =>
	standard<number, number>(
		({ input, path }, opts) =>
			opts.wrapError(
				`typeof ${input} !== 'number' || isNaN(${input})`,
				`PipeError.root('${err}', ${input}, ${path})`,
			),
		{
			schema: () => ({ type: 'number' }),
		},
	)

const isBoolean = (err = 'is not a boolean') =>
	standard<boolean, boolean>(
		({ input, path }, opts) =>
			opts.wrapError(`typeof ${input} !== 'boolean'`, `PipeError.root('${err}', ${input}, ${path})`),
		{
			schema: () => ({ type: 'boolean' }),
		},
	)

const isNull = (err = 'is not null') =>
	standard<null, null>(
		({ input, path }, opts) => opts.wrapError(`${input} !== null`, `PipeError.root('${err}', ${input}, ${path})`),
		{
			schema: () => ({ type: 'null' }),
		},
	)

const isUndefined = (err = 'is not undefined') =>
	standard<undefined, undefined>(
		({ input, path }, opts) =>
			opts.wrapError(`${input} !== undefined`, `PipeError.root('${err}', ${input}, ${path})`),
		{
			schema: () => ({ type: 'undefined' }),
		},
	)

const isAny = <T>() => standard<T, T>(() => [])

const isInstanceOf = <T>(
	classDef: abstract new (...args: any[]) => T,
	err = `is not an instance of ${classDef.name}`,
) =>
	standard<T, T>(
		({ input, context, path }, opts) =>
			opts.wrapError(
				`${input}?.constructor !== ${context}.classDef && !(${input} instanceof ${context}.classDef)`,
				`PipeError.root('${err}', ${input}, ${path})`,
			),
		{
			context: { classDef },
		},
	)

export {
	isString as string,
	isNumber as number,
	isBoolean as boolean,
	isNull as null,
	isUndefined as undefined,
	isAny as any,
	isInstanceOf as instanceOf,
}
