import { describe, expect, test } from 'vitest'

import { v } from '../../src'

describe('optionals', () => {
	test('conditional', () => {
		const rules = v.conditional(v.string(), () => false)
		expect(v.validate(rules, '').valid).toBe(true)
		expect(v.validate(rules, undefined).valid).toBe(true)
		expect(v.validate(rules, 2).valid).toBe(true)
	})

	test('optional', () => {
		const rules = v.optional(v.string())
		expect(v.validate(rules, '').valid).toBe(true)
		expect(v.validate(rules, undefined).valid).toBe(true)
		expect(v.validate(rules, null).valid).toBe(false)
		expect(v.validate(rules, 2).valid).toBe(false)
	})

	test('nullable', () => {
		const rules = v.nullable(v.string())
		expect(v.validate(rules, '').valid).toBe(true)
		expect(v.validate(rules, null).valid).toBe(true)
		expect(v.validate(rules, undefined).valid).toBe(false)
		expect(v.validate(rules, 2).valid).toBe(false)
	})

	test('nullish', () => {
		const rules = v.nullish(v.string())
		expect(v.validate(rules, '').valid).toBe(true)
		expect(v.validate(rules, null).valid).toBe(true)
		expect(v.validate(rules, undefined).valid).toBe(true)
		expect(v.validate(rules, 2).valid).toBe(false)
	})

	test('defaults', () => {
		const rules = v.defaults(v.string(), '')
		expect(v.validate(rules, 'hi').valid).toBe(true)
		expect(v.validate(rules, null).valid).toBe(false)
		expect(v.validate(rules, undefined).valid).toBe(true)
	})

	test('catch', () => {
		const defaultValue = 'default'
		// eslint-disable-next-line promise/valid-params
		const rules = v.catch(v.string(), defaultValue)
		expect(v.validate(rules, 'hi').valid).toBe(true)
		expect(v.validate(rules, null).valid).toBe(true)
		expect(v.assert(rules, null)).toBe(defaultValue)
		expect(v.validate(rules, undefined).valid).toBe(true)
	})
})
