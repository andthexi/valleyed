import { isType } from './isType'

function getDiff(val1: any, val2: any, parent?: string) {
	if (!isType.object(val1) || !isType.object(val2)) return []
	const record1 = val1 as Record<string, unknown>
	const record2 = val2 as Record<string, unknown>
	const keys = [...new Set(Object.keys(record1).concat(Object.keys(record2)))]
	const diff: string[] = []
	for (const key of keys) {
		const parentKey = (parent ? `${parent}.` : '') + key
		if (!(key in record1) || !(key in record2)) {
			diff.push(parentKey)
			continue
		}
		const obj1 = record1[key]
		const obj2 = record2[key]
		if (isType.object(obj1) && isType.object(obj2)) diff.push(...getDiff(obj1, obj2, parentKey))
		else if (!equal(obj1, obj2)) diff.push(parentKey)
	}
	return diff
}

export function equal(v1: unknown, v2: unknown): boolean {
	if (v1 === v2) return true

	if (isType.string(v1)) return v1 === v2
	if (isType.number(v1)) return v1 === v2
	if (isType.bigint(v1)) return v1 === v2
	if (isType.boolean(v1)) return v1 === v2
	if (isType.null(v1)) return v1 === v2
	if (isType.undefined(v1)) return v1 === v2
	if (isType.function(v1)) return v1 === v2

	if (isType.regex(v1)) return isType.regex(v2) && v1.source === v2.source
	if (isType.nan(v1)) return isType.nan(v2)
	if (isType.date(v1)) return isType.date(v2) && v1.getTime() === v2.getTime()

	const [val1, val2] = [v1, v2].map((v) => {
		if (isType.map(v)) return Object.fromEntries(v.entries())
		if (isType.set(v)) return [...v]
		return v
	})

	if (val1 === val2) return true

	if (isType.array(val1)) {
		if (!isType.array(val2)) return false
		if (val1.length !== val2.length) return false
		return val1.every((c, i) => equal(c, val2.at(i)))
	}

	if (isType.object(val1) && isType.object(val2)) {
		const record1 = val1 as Record<string, unknown>
		const record2 = val2 as Record<string, unknown>
		const keys1 = Object.keys(record1)
		const keys2 = Object.keys(record2)
		if (keys1.length !== keys2.length) return false
		const keys = [...new Set(keys1.concat(keys2))]
		return keys.every((key) => key in record1 && key in record2 && equal(record1[key], record2[key]))
	}

	return false
}

export function diff(val1: unknown, val2: unknown) {
	return getDiff(val1, val2)
}

export function from(keys: string[]) {
	const deepMerge = (from: Record<string, unknown>, to: Record<string, unknown>): Record<string, unknown> =>
		Object.entries(from).reduce<Record<string, unknown>>(
			(merged, [key, obj]) => {
				merged[key] = isType.object(obj)
					? deepMerge(obj as Record<string, unknown>, (merged[key] as Record<string, unknown>) ?? {})
					: obj
				return merged
			},
			{ ...to },
		)

	const formObject = (key: string) =>
		key
			.split('.')
			.reverse()
			.reduce<Record<string, any>>((acc, k) => ({ [k]: acc ?? true }), null as any)

	return keys.map(formObject).reduce(deepMerge, {})
}

export function merge(v1: unknown, v2: unknown): unknown {
	if (isType.undefined(v1)) return v2
	if (isType.undefined(v2)) return v1
	if (isType.array(v1) && isType.array(v2)) {
		return Array.from({ length: Math.max(v1.length, v2.length) }, (_, i): unknown => merge(v1[i], v2[i]))
	}
	if (isType.object(v1) && isType.object(v2)) {
		const record1 = v1 as Record<string, unknown>
		const record2 = v2 as Record<string, unknown>
		const keys = new Set([...Object.keys(record1), ...Object.keys(record2)])
		return Array.from(keys).reduce(
			(acc, key) => {
				acc[key] = merge(record1[key], record2[key])
				return acc
			},
			{} as Record<string, any>,
		)
	}
	return v2
}
