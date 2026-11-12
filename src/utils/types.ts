export type DeepOmit<T, K, A = never> = T extends any[]
	? DeepOmit<T[number], K, A>[]
	: T extends (...args: any[]) => any
		? T
		: T extends Array<infer U>
			? DeepOmit<U, K, A>[]
			: {
					[P in keyof T as P extends K | A ? never : P]: DeepOmit<
						T[P],
						K extends `${Exclude<P, symbol>}.${infer R}` ? R : never,
						A
					>
				}

export type ConditionalObjectKeys<T> =
	T extends Array<infer I>
		? Array<ConditionalObjectKeys<I>>
		: T extends object
			? Prettify<
					{
						[K in keyof T as undefined extends T[K] ? never : K]: ConditionalObjectKeys<T[K]>
					} & {
						[K in keyof T as undefined extends T[K] ? K : never]?: ConditionalObjectKeys<T[K]>
					}
				>
			: T

export class JSONRedacted<T> {
	private constructor(public value: T) {}
	valueOf() {
		return this.value
	}
	toBSON() {
		return this.value
	}
	toJSON() {
		return undefined as never
	}
	static from<T>(value: T | JSONRedacted<T>) {
		if (value instanceof JSONRedacted) return value
		return new JSONRedacted(value)
	}
}

type Format<T, Primitives, FactoryKey extends PropertyKey> = Prettify<
	IsAny<T> extends true
		? any
		: T extends Primitives
			? T
			: IsInUnion<T, undefined> extends true
				? Format<Exclude<T, undefined>, Primitives, FactoryKey> | undefined
				: T extends Array<infer U>
					? Format<U, Primitives, FactoryKey>[]
					: T extends Record<FactoryKey, (...args: any[]) => any>
						? Format<ReturnType<T[FactoryKey]>, Primitives, FactoryKey>
						: T extends Function
							? never
							: T extends object
								? ConditionalObjectKeys<{
										[
											K in keyof T as IsInTypeList<
												Format<T[K], Primitives, FactoryKey>,
												[never, undefined]
											> extends true
												? never
												: K
										]: Format<T[K], Primitives, FactoryKey>
									}>
								: never
>

type JSONPrimitives = string | number | boolean | null
export type JSONValueOf<T> = Format<T, JSONPrimitives, 'toJSON'>
export type BSONValueOf<T> = Format<T, JSONPrimitives, 'toBSON'>

export type Prettify<T> =
	T extends Array<infer I>
		? Array<Prettify<I>>
		: IsClassInstance<T> extends true
			? T
			: T extends object
				? {
						[K in keyof T]: Prettify<T[K]>
					} & {}
				: T

export type EnumToStringUnion<T extends Record<string, string | number>> = `${T[keyof T]}`

export type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> }

export type DistributiveOmit<T, K extends PropertyKey> = T extends any ? Omit<T, K> : never

type IsInUnion<T, U> = U extends T ? true : false
export type IsInTypeList<T, L extends any[]> = L extends [infer First, ...infer Remaining]
	? IsType<First, T> extends true
		? true
		: IsInTypeList<T, Remaining>
	: false

type IsAny<T> = 0 extends 1 & T ? true : false
type CheckSameType<A, B> = Exclude<A, B> | Exclude<B, A> extends never ? true : false
export type IsType<A, B> =
	IsAny<A> extends true ? (IsAny<B> extends true ? true : CheckSameType<A, B>) : CheckSameType<A, B>

export type IsPlainObject<T> = T extends object
	? T extends (...args: any[]) => any
		? false
		: T extends any[]
			? false
			: T extends Date | RegExp | Error
				? false
				: true
	: false

export type IsClassInstance<T> = T extends object ? (IsPlainObject<T> extends true ? false : true) : false

type StopTypes = number | string | boolean | symbol | bigint | Date
type ExcludedTypes = (...args: any[]) => any
type Dot<T extends string, U extends string> = '' extends U ? T : `${T}.${U}`
export type Paths<T, D = never> = T extends StopTypes
	? ''
	: T extends object
		? {
				[K in keyof T & string]: T[K] extends StopTypes
					? K
					: T[K] extends ExcludedTypes
						? D
						: K | Dot<K, Paths<T[K]>>
			}[keyof T & string]
		: T extends readonly any[]
			? Paths<T[number]>
			: D

export interface JsonSchema {
	$ref?: string
	$refId?: string
	type?: string | string[]
	format?: string
	pattern?: string
	minimum?: number
	maximum?: number
	exclusiveMinimum?: number
	exclusiveMaximum?: number
	minLength?: number
	maxLength?: number
	minItems?: number
	maxItems?: number
	items?: JsonSchema | JsonSchema[]
	properties?: Record<string, JsonSchema>
	required?: string[]
	additionalProperties?: boolean | JsonSchema
	propertyNames?: JsonSchema
	enum?: any[]
	anyOf?: JsonSchema[]
	allOf?: JsonSchema[]
	oneOf?: JsonSchema[]
	const?: any
	not?: JsonSchema
	title?: string
	description?: string
	default?: any
	examples?: any[]
	contentMediaType?: string | string[]
}
