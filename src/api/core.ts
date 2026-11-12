import { equal } from '../utils/differ'
import { PipeError } from './base'
import { define, standard } from './base/pipes'

export const custom = <T>(condition: (input: T) => boolean, err = `doesn't pass custom rule`) =>
	define<T, T>(
		(input) => {
			if (condition(input)) return input
			return PipeError.root(err, input)
		},
		{
			context: { custom: condition },
		},
	)

export const eq = <const T>(compare: T, err?: string) =>
	standard<T, T>(
		({ input, context, path }, opts) =>
			opts.wrapError(
				`${input} !== ${context}.eq && !${context}.equal(${input}, ${context}.eq)`,
				`PipeError.root(\`${err ?? `is not equal to \${${context}.eq}`}\`, ${input}, ${path})`,
			),
		{
			context: { eq: compare, equal },
			schema: (context) => ({ const: context.eq ?? compare }),
		},
	)

export const is = eq

export const ne = <T>(compare: T, err?: string) =>
	standard<T, T>(
		({ input, context, path }, opts) =>
			opts.wrapError(
				`${input} === ${context}.ne || ${context}.equal(${input}, ${context}.ne)`,
				`PipeError.root(\`${err ?? `is equal to \${${context}.ne}`}\`, ${input}, ${path})`,
			),
		{
			context: { ne: compare, equal },
			schema: (context) => ({ not: { const: context.eq ?? compare } }),
		},
	)

const inArray = <const T>(array: T[], err?: string) =>
	standard<T, T>(
		({ input, context, path }, opts) =>
			opts.wrapError(
				`!${context}.in.some((x) => ${input} === x || ${context}.equal(${input}, x))`,
				`PipeError.root(\`${err ?? `is not in the list: [\${${context}.in}]`}\`, ${input}, ${path})`,
			),
		{
			context: { in: array, equal },
			schema: (context) => ({ enum: [...(context.in ?? array)] }),
		},
	)

export const nin = <T>(array: Readonly<T[]>, err?: string) =>
	standard<T, T>(
		({ input, context, path }, opts) =>
			opts.wrapError(
				`${context}.nin.some((x) => ${input} === x || ${context}.equal(${input}, x))`,
				`PipeError.root(\`${err ?? `is in the list: [\${${context}.nin}]`}\`, ${input}, ${path})`,
			),
		{
			context: { nin: array, equal },
			schema: (context) => ({ not: { enum: [...(context.nin ?? array)] } }),
		},
	)

function itemType(input: unknown) {
	return input?.constructor?.name === 'String' ? 'characters' : 'items'
}

export const has = <T extends { length: number }>(length: number, err?: string) =>
	standard<T, T>(
		({ input, context, path }, opts) =>
			opts.wrapError(
				`${input}.length !== ${context}.has`,
				`PipeError.root(\`${err ?? `must contain \${${context}.has} \${${context}.itemType(${input})}`}\`, ${input}, ${path})`,
			),
		{
			context: { has: length, itemType },
			schema: (context) => {
				const val = context.has ?? length
				return {
					minItems: val,
					maxItems: val,
					minLength: val,
					maxLength: val,
				}
			},
		},
	)

export const min = <T extends { length: number }>(length: number, err?: string) =>
	standard<T, T>(
		({ input, context, path }, opts) =>
			opts.wrapError(
				`${input}.length < ${context}.min`,
				`PipeError.root(\`${err ?? `must contain \${${context}.min} or more \${${context}.itemType(${input})}`}\`, ${input}, ${path})`,
			),
		{
			context: { min: length, itemType },
			schema: (context) => {
				const val = context.min ?? length
				return { minItems: val, minLength: val }
			},
		},
	)

export const max = <T extends { length: number }>(length: number, err?: string) =>
	standard<T, T>(
		({ input, context, path }, opts) =>
			opts.wrapError(
				`${input}.length > ${context}.max`,
				`PipeError.root(\`${err ?? `must contain \${${context}.max} or less \${${context}.itemType(${input})}`}\`, ${input}, ${path})`,
			),
		{
			context: { max: length, itemType },
			schema: (context) => {
				const val = context.min ?? length
				return { maxItems: val, maxLength: val }
			},
		},
	)

export { inArray as in }
