import util from 'node:util'

import { wrapInTryCatch } from './functions'
import type { JSONValueOf } from './types'

if (util?.inspect?.defaultOptions) {
	util.inspect.defaultOptions.depth = Number.MAX_SAFE_INTEGER
	util.inspect.defaultOptions.getters = true
	util.inspect.defaultOptions.numericSeparator = true
}

const customInspectSymbol = Symbol.for('nodejs.util.inspect.custom')

type Accessor<Keys extends object> = {
	get: <Key extends keyof Keys>(key: Key, keysObj: Keys) => Keys[Key]
	set: <Key extends keyof Keys>(key: Key, value: Keys[Key], keysObj: Keys) => void
}

class DataClassImpl<Keys extends object> {
	constructor(
		keys: Keys,
		access: Accessor<Keys> = {
			get: (key, keys) => keys[key],
			set: (key, value, keys) => {
				keys[key] = value
			},
		},
	) {
		Object.keys(keys).forEach((key) => {
			Object.defineProperty(this, key, {
				get: () => access.get(key as keyof Keys, keys),
				set: (value) => {
					access.set(key as keyof Keys, value, keys)
				},
				enumerable: true,
				configurable: true,
			})
		})
	}

	[customInspectSymbol](_depth: number, options: util.InspectOptionsStylized, inspect: typeof util.inspect) {
		options.getters = true
		options.numericSeparator = true
		options.depth = Number.MAX_SAFE_INTEGER
		return (
			options.stylize(this.constructor.name, 'special') + ' ' + inspect((this as any).toJSON?.() ?? this, options)
		)
	}

	toJSON(): JSONValueOf<Keys> {
		const json: Record<string, any> = {}
		const values = this as Record<string, unknown>
		Object.keys(values).forEach((key) => {
			const value = values[key]
			if (typeof value === 'function' || value === undefined) return
			json[key] = wrapInTryCatch(() => (value as any)?.toJSON?.() ?? structuredClone(value), value)
		})
		return json as any
	}

	toString() {
		return JSON.stringify(this.toJSON())
	}
}

export type DataClass<Keys extends object> = DataClassImpl<Keys> & Keys

export const DataClass = DataClassImpl as {
	new <Keys extends object>(keys: Keys, access?: Accessor<Keys>): DataClass<Keys>
}
