import { standard } from './base/pipes'
import { getRandomValue } from '../utils/functions'

export type Timeable = Date | string | number

export const time = (err = 'is not a valid datetime') => {
	const varName = `date_${getRandomValue()}`
	return standard<Timeable, Date>(
		({ input, path }, opts) => [
			opts.wrapError(
				`!(${input} instanceof Date || typeof ${input} === 'number' || typeof ${input} === 'string')`,
				`PipeError.root('${err}', ${input}, ${path})`,
			),
			`const ${varName} = new Date(${input})`,
			opts.wrapError(`isNaN(${varName}.getTime())`, `PipeError.root('${err}', ${input}, ${path})`),
			`${input} = ${varName}`,
		],
		{
			schema: () => ({ oneOf: [{ type: 'string', format: 'date-time' }, { type: 'integer' }] }),
		},
	)
}

export const after = (compare: Timeable, err?: string) => {
	const varName = `compare_${getRandomValue()}`
	return standard<Date, Date>(
		({ input, context, path }, opts) => [
			`const ${varName} = new Date(${context}.after)`,
			opts.wrapError(
				`${input} <= ${varName}`,
				`PipeError.root('${err ?? `is not later than \${${varName}.toString()}`}', ${input}, ${path})`,
			),
		],
		{
			context: { after: compare },
		},
	)
}

export const before = (compare: Timeable, err?: string) => {
	const varName = `compare_${getRandomValue()}`
	return standard<Date, Date>(
		({ input, context, path }, opts) => [
			`const ${varName} = new Date(${context}.before)`,
			opts.wrapError(
				`${input} >= ${varName}`,
				`PipeError.root('${err ?? `is not earlier than \${${varName}.toString()}`}', ${input}, ${path}, ${path})`,
			),
		],
		{
			context: { before: compare },
		},
	)
}

export const asStamp = () =>
	standard<Date, number>(({ input }) => [`${input} = ${input}.getTime()`], {
		schema: () => ({ type: 'integer', oneOf: undefined }),
	})
export const asISOString = () =>
	standard<Date, string>(({ input }) => [`${input} = ${input}.toISOString()`], {
		schema: () => ({ type: 'string', format: 'date-time', oneOf: undefined }),
	})
