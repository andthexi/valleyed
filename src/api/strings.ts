import { capitalize, getRandomValue, stripHTML, trimToLength } from '../utils/functions'
import { emailRegex, urlRegex } from '../utils/regexes'
import type { Pipe } from './base'
import { compileNested, context, schema, standard } from './base/pipes'

export const email = (err = 'is not a valid email') =>
	standard<string, string>(
		({ input, context, path }, opts) =>
			opts.wrapError(`!${context}.emailRegex.test(${input})`, `PipeError.root('${err}', ${input}, ${path})`),
		{
			context: { emailRegex },
			schema: () => ({ format: 'email' }),
		},
	)

export const url = (err = 'is not a valid url') =>
	standard<string, string>(
		({ input, context, path }, opts) =>
			opts.wrapError(`!${context}.urlRegex.test(${input})`, `PipeError.root('${err}', ${input}, ${path})`),
		{
			context: { urlRegex },
			schema: () => ({ format: 'uri' }),
		},
	)

export const withStrippedHtml = (branch: Pipe<string, string>) => {
	const varname = `stripped_${getRandomValue()}`
	return standard<string, string>(
		({ input, context }, opts) => [
			`let ${varname} = ${context}.stripHTML(${input})`,
			...compileNested({ opts, pipe: branch, input: varname }),
		],
		{
			context: { ...context(branch), stripHTML },
			schema: () => schema(branch),
		},
	)
}

export const asTrimmed = () => standard<string, string>(({ input }) => [`${input} = ${input}.trim()`])

export const asLowercased = () => standard<string, string>(({ input }) => [`${input} = ${input}.toLowerCase()`])

export const asUppercased = () => standard<string, string>(({ input }) => [`${input} = ${input}.toUpperCase()`])

export const asCapitalized = () =>
	standard<string, string>(({ input, context }) => [`${input} = ${context}.capitalize(${input})`], {
		context: { capitalize },
	})

export const asStrippedHtml = () =>
	standard<string, string>(({ input, context }) => [`${input} = ${context}.stripHTML(${input})`], {
		context: { stripHTML },
	})

export const asSliced = (length: number) =>
	standard<string, string>(({ input, context }) => [`${input} = ${context}.trimToLength(${input}, ${length})`], {
		context: { trimToLength },
	})
