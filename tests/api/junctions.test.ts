import { describe, expect, test } from 'vitest'

import type { Pipe } from '../../src'
import { v } from '../../src'

describe('junctions', () => {
	test('or', () => {
		const rules = v.or([v.string(), v.number()])
		expect(v.validate(rules, '').valid).toBe(true)
		expect(v.validate(rules, 2).valid).toBe(true)
		expect(v.validate(rules, false).valid).toBe(false)
	})

	test('merge', () => {
		const rules1 = v.merge(v.string(), v.number())
		expect(v.validate(rules1, 'ha').valid).toBe(false)
		expect(v.validate(rules1, 2).valid).toBe(false)

		const rules2 = v.merge(v.object({ a: v.string() }), v.object({ b: v.number() }))
		expect(v.validate(rules2, {}).valid).toBe(false)
		expect(v.validate(rules2, { a: '' }).valid).toBe(false)
		expect(v.validate(rules2, { b: 2 }).valid).toBe(false)
		expect(v.validate(rules2, { a: '', b: 2 }).valid).toBe(true)
		expect(v.assert(rules2, { a: '', b: 2 })).toEqual({ a: '', b: 2 })

		const rules3 = v.merge(v.array(v.object({ a: v.string() })), v.array(v.object({ b: v.number() })))
		expect(v.validate(rules3, []).valid).toBe(true)
		expect(v.validate(rules3, [{ a: '' }]).valid).toBe(false)
		expect(v.validate(rules3, [{ b: 2 }]).valid).toBe(false)
		expect(v.validate(rules3, [{ a: '' }, { b: 2 }]).valid).toBe(false)
		expect(v.validate(rules3, [{ a: '', b: 2 }]).valid).toBe(true)
	})

	test('discriminate', () => {
		const rules = v.discriminate((v) => v as any, {
			ha: v.string(),
			make: v.string().pipe(v.has(4)),
		})
		expect(v.validate(rules, 'ha').valid).toBe(true)
		expect(v.validate(rules, 2).valid).toBe(false)
		expect(v.validate(rules, 'make').valid).toBe(true)
		expect(v.validate(rules, 'made').valid).toBe(false)

		const objectRules = v.discriminate((v) => (v as any).status, {
			ha: v.object({ status: v.is('ha'), total: v.number().pipe(v.gt(10)) }),
			name: v.object({ status: v.is('name'), flow: v.boolean() }),
		})
		expect(v.validate(objectRules, { status: 'ha', total: 12 }).valid).toBe(true)
		expect(v.validate(objectRules, { status: 'ha', total: 9 }).valid).toBe(false)
		expect(v.validate(objectRules, { status: 'none' }).valid).toBe(false)
	})

	test('fromJson', () => {
		const rules = v.fromJson(v.number())
		expect(v.validate(rules, 'and').valid).toBe(false)
		expect(v.validate(rules, '"1"').valid).toBe(false)
		expect(v.validate(rules, '1')).toEqual({ value: 1, valid: true })
		expect(v.validate(rules, 1)).toEqual({ value: 1, valid: true })
		expect(v.validate(v.fromJson(v.nullable(v.string())), 'null')).toEqual({ value: null, valid: true })
		expect(v.validate(v.fromJson(v.nullable(v.string())), '"null"')).toEqual({ value: 'null', valid: true })
	})

	test('jsonRedacted', () => {
		const rules = v.jsonRedacted(v.number())
		expect(v.validate(rules, '1').valid).toBe(false)

		const objValue = { a: 1, b: 2 }
		const validatedObj = v.validate(v.jsonRedacted(v.object({ a: v.number(), b: v.number() })), objValue)
		expect(validatedObj.valid).toBe(true)
		if (validatedObj.valid) {
			expect(validatedObj.value.value).toEqual(objValue)
			expect(JSON.stringify({ value: validatedObj.value })).toBe('{}')
		}

		const strValue = 'hello'
		const validatedStr = v.validate(v.jsonRedacted(v.string()), strValue)
		expect(validatedStr.valid).toBe(true)
		if (validatedStr.valid) {
			expect(validatedStr.value.value).toEqual(strValue)
			expect(JSON.stringify({ value: validatedStr.value })).toBe('{}')
		}

		const numValue = 1
		const validatedNum = v.validate(v.jsonRedacted(v.number()), numValue)
		expect(validatedNum.valid).toBe(true)
		if (validatedNum.valid) {
			expect(validatedNum.value.value).toEqual(numValue)
			expect(JSON.stringify({ value: validatedNum.value })).toBe('{}')
		}

		const nullValue = null
		const validatedNull = v.validate(v.jsonRedacted(v.null()), nullValue)
		expect(validatedNull.valid).toBe(true)
		if (validatedNull.valid) {
			expect(validatedNull.value.value).toBe(nullValue)
			expect(JSON.stringify({ value: validatedNull.value })).toBe('{}')
		}
	})

	test('lazy', () => {
		const rules = v.lazy(() => v.number().pipe(v.gt(5)))
		expect(v.validate(rules, '').valid).toBe(false)
		expect(v.validate(rules, 5).valid).toBe(false)
		expect(v.validate(rules, 6).valid).toBe(true)
	})

	test('recursive', () => {
		type Node = { value: number; left?: Node }
		const rules: Pipe<Node, Node> = v.recursive(
			() => v.object({ value: v.number(), left: v.optional(rules) }),
			'Node',
		)
		expect(v.validate(rules, { value: 1 }).valid).toBe(true)
		expect(v.validate(rules, { value: 1, left: { value: 2 } }).valid).toBe(true)
		expect(v.validate(rules, { value: 1, left: null }).valid).toBe(false)

		const schema = v.schema(rules)
		expect(schema).toBeDefined()
	})
})
