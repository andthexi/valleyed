# Valleyed

A blazingly fast, type-safe validation library for TypeScript that compiles schemas into optimized functions. Define schemas in TypeScript instead of JSON, with support for transformations at any point in the validation process.

## ✨ Features

- **🚀 Performance**: 1.5x faster than AJV, 5-10x faster than Zod
- **🔥 Type Safety**: Full TypeScript support with automatic type inference
- **⚡ Compiled Validation**: Schemas compile to optimized functions using `new Function`
- **🔄 Transformations**: Apply transformations during validation with pipes
- **📦 Comprehensive**: Extensive validation rules for all data types
- **🛠️ Developer Experience**: Intuitive API with excellent error messages
- **🌐 Standard Schema**: Implements the Standard Schema specification

## 📦 Installation

```bash
npm install valleyed
```

## 🚀 Quick Start

```typescript
import { v } from 'valleyed'

// Define a schema
const userSchema = v.object({
	name: v.string().pipe(v.min(2)),
	age: v.number().pipe(v.gte(0)),
	email: v.string().pipe(v.email()),
})

// Validate data
const userData = {
	name: 'John Doe',
	age: 25,
	email: 'john@example.com',
}

const result = v.validate(userSchema, userData)
if (result.valid) {
	console.log('Valid data:', result.value)
} else {
	console.log('Validation errors:', result.toString())
}
```

## 📚 Core Concepts

### Pipes

Pipes allow you to chain validation rules and transformations:

```typescript
const usernamePipe = v.string().pipe(v.min(3)).pipe(v.asLowercased()).pipe(v.asTrimmed())
```

### Execution Functions

- `v.validate(schema, data)`: Returns validation result with error details
- `v.assert(schema, data)`: Returns validated data or throws error

```typescript
// Using validate
const result = v.validate(userSchema, userData)

// Using assert
const validatedData = v.assert(userSchema, userData)
```

### Type Inference

Valleyed automatically infers TypeScript types:

```typescript
const userSchema = v.object({
	name: v.string(),
	age: v.number(),
})

type UserInput = v.PipeInput<typeof userSchema> // { name: string; age: number }
type UserOutput = v.PipeOutput<typeof userSchema> // { name: string; age: number }
```

## 📚 API Reference

### Primitive Types

```typescript
// Basic types
const stringSchema = v.string() // string validation
const numberSchema = v.number() // number validation
const booleanSchema = v.boolean() // boolean validation
const nullSchema = v.null() // null validation
const undefinedSchema = v.undefined() // undefined validation
const anySchema = v.any() // accepts any value

// Instance validation
const dateSchema = v.instanceOf(Date) // validates instanceof Date

// Examples
v.validate(stringSchema, '2').valid // true
v.validate(stringSchema, 2).valid // false
v.validate(numberSchema, 2).valid // true
v.validate(booleanSchema, true).valid // true
v.validate(nullSchema, null).valid // true
v.validate(undefinedSchema, undefined).valid // true
v.validate(anySchema, 'anything').valid // true
v.validate(dateSchema, new Date()).valid // true
```

### Core Validators

```typescript
// Custom validation
const customSchema = v.custom((val) => val !== '')
v.validate(customSchema, 'hi').valid // true
v.validate(customSchema, '').valid // false

// Equality checks
const equalSchema = v.eq('hi')
v.validate(equalSchema, 'hi').valid // true
v.validate(equalSchema, '').valid // false

const notEqualSchema = v.ne('')
v.validate(notEqualSchema, 'hi').valid // true
v.validate(notEqualSchema, '').valid // false

// Array/list checks
const inSchema = v.in([1, 2, 3])
v.validate(inSchema, 1).valid // true
v.validate(inSchema, 4).valid // false

const notInSchema = v.nin([1, 2, 3])
v.validate(notInSchema, 4).valid // true
v.validate(notInSchema, 1).valid // false

// Length validation
const exactLengthSchema = v.string().pipe(v.has(2))
v.validate(exactLengthSchema, 'hi').valid // true
v.validate(exactLengthSchema, 'h').valid // false

const minLengthSchema = v.string().pipe(v.min(2))
v.validate(minLengthSchema, '12').valid // true
v.validate(minLengthSchema, '1').valid // false

const maxLengthSchema = v.string().pipe(v.max(2))
v.validate(maxLengthSchema, '12').valid // true
v.validate(maxLengthSchema, '123').valid // false
```

### String Validators

```typescript
// String format validation
const emailSchema = v.string().pipe(v.email())
v.validate(emailSchema, 'a@mail.co').valid // true
v.validate(emailSchema, '12').valid // false

const urlSchema = v.string().pipe(v.url())
v.validate(urlSchema, 'www.a.co').valid // true
v.validate(urlSchema, '12').valid // false

// String transformations
const trimmedSchema = v.string().pipe(v.asTrimmed())
v.assert(trimmedSchema, ' 12  ') // '12'

const lowercaseSchema = v.string().pipe(v.asLowercased())
v.assert(lowercaseSchema, 'ABC') // 'abc'

const uppercaseSchema = v.string().pipe(v.asUppercased())
v.assert(uppercaseSchema, 'abc') // 'ABC'

const capitalizedSchema = v.string().pipe(v.asCapitalized())
v.assert(capitalizedSchema, 'abc. no. i.') // 'Abc. No. I.'

const htmlStrippedSchema = v.string().pipe(v.asStrippedHtml())
v.assert(htmlStrippedSchema, '<p>Hi</p>') // 'Hi'

const slicedSchema = v.string().pipe(v.asSliced(2))
v.assert(slicedSchema, 'Hi!') // 'Hi...'
v.assert(slicedSchema, 'Hi') // 'Hi'

// HTML content validation
const htmlValidationSchema = v.string().pipe(v.withStrippedHtml(v.min(1)))
v.validate(htmlValidationSchema, '<img>').valid // false
v.validate(htmlValidationSchema, '<img>1').valid // true
v.validate(htmlValidationSchema, '<p>Hi</p>').valid // true
```

### Number Validators

```typescript
// Number comparisons
const greaterThanSchema = v.number().pipe(v.gt(3))
v.validate(greaterThanSchema, 4).valid // true
v.validate(greaterThanSchema, 3).valid // false

const greaterEqualSchema = v.number().pipe(v.gte(3))
v.validate(greaterEqualSchema, 3).valid // true
v.validate(greaterEqualSchema, 2).valid // false

const lessThanSchema = v.number().pipe(v.lt(3))
v.validate(lessThanSchema, 2).valid // true
v.validate(lessThanSchema, 3).valid // false

const lessEqualSchema = v.number().pipe(v.lte(3))
v.validate(lessEqualSchema, 3).valid // true
v.validate(lessEqualSchema, 4).valid // false

// Integer validation
const integerSchema = v.number().pipe(v.int())
v.validate(integerSchema, 3).valid // true
v.validate(integerSchema, 3.6).valid // false

// Number transformations
const roundedSchema = v.number().pipe(v.asRounded(3))
v.assert(roundedSchema, 3.45678) // 3.457
v.assert(roundedSchema, 4) // 4
```

### Array Validators

```typescript
// Array validation
const stringArraySchema = v.array(v.string())
v.validate(stringArraySchema, []).valid // true
v.validate(stringArraySchema, ['']).valid // true
v.validate(stringArraySchema, [2]).valid // false

// Tuple validation (fixed-length)
const tupleSchema = v.tuple([v.string(), v.number()])
v.validate(tupleSchema, []).valid // false
v.validate(tupleSchema, ['']).valid // false
v.validate(tupleSchema, ['', 2]).valid // true
v.validate(tupleSchema, [2, '']).valid // false

// Array transformations
const setSchema = v.array(v.number().pipe(v.asRounded())).pipe(v.asSet())
v.assert(setSchema, [1]) // [1]
v.assert(setSchema, [1, 1]) // [1] (duplicates removed)
v.assert(setSchema, [1.1, 1.2, 1.3]) // [1] (rounded then deduplicated)
```

### Object Validators

```typescript
// Object validation
const userSchema = v.object({
	name: v.string(),
	age: v.number(),
})
v.validate(userSchema, { name: '', age: 25 }).valid // true
v.validate(userSchema, { name: 1 }).valid // false

// Nested objects
const addressSchema = v.object({
	name: v.string(),
	address: v.object({
		city: v.string().pipe(v.min(1)),
		zip: v.string().pipe(v.min(1)),
	}),
})
v.validate(addressSchema, {
	name: '',
	address: { city: 'NYC', zip: '10001' },
}).valid // true

// Object manipulation
const pickSchema = v.objectPick(userSchema, ['name'])
v.validate(pickSchema, { name: '' }).valid // true

const omitSchema = v.objectOmit(userSchema, ['age'])
v.validate(omitSchema, { name: '' }).valid // true

// Record validation (dynamic keys)
const recordSchema = v.record(v.string(), v.number())
v.validate(recordSchema, {}).valid // true
v.validate(recordSchema, { a: 1 }).valid // true
v.validate(recordSchema, { a: 'a' }).valid // false

// Convert to Map
const mapSchema = v.record(v.string(), v.number()).pipe(v.asMap())
v.assert(mapSchema, { a: 1, b: 2 }) // Map([['a', 1], ['b', 2]])
```

### Optional & Default Values

```typescript
// Optional values
const optionalSchema = v.optional(v.string())
v.validate(optionalSchema, '').valid // true
v.validate(optionalSchema, undefined).valid // true
v.validate(optionalSchema, null).valid // false

const nullableSchema = v.nullable(v.string())
v.validate(nullableSchema, '').valid // true
v.validate(nullableSchema, null).valid // true
v.validate(nullableSchema, undefined).valid // false

const nullishSchema = v.nullish(v.string())
v.validate(nullishSchema, '').valid // true
v.validate(nullishSchema, null).valid // true
v.validate(nullishSchema, undefined).valid // true

// Default values
const defaultSchema = v.defaults(v.string(), 'default')
v.validate(defaultSchema, 'hi').valid // true
v.validate(defaultSchema, undefined).valid // true

// Fallback on error
const catchSchema = v.catch(v.string(), 'fallback')
v.validate(catchSchema, 'hi').valid // true
v.validate(catchSchema, null).valid // true
v.assert(catchSchema, null) // 'fallback'

// Conditional validation
const conditionalSchema = v.conditional(v.string(), () => false)
v.validate(conditionalSchema, '').valid // true
v.validate(conditionalSchema, undefined).valid // true
v.validate(conditionalSchema, 2).valid // true
```

### Junctions (Unions & Intersections)

```typescript
// Union types
const unionSchema = v.or([v.string(), v.number()])
v.validate(unionSchema, '').valid // true
v.validate(unionSchema, 2).valid // true
v.validate(unionSchema, false).valid // false

// Intersection types
const mergeSchema = v.merge(v.object({ a: v.string() }), v.object({ b: v.number() }))
v.validate(mergeSchema, { a: '', b: 2 }).valid // true
v.validate(mergeSchema, { a: '' }).valid // false

// Discriminated unions
const discriminatedSchema = v.discriminate((v) => v as any, {
	ha: v.string(),
	make: v.string().pipe(v.has(4)),
})
v.validate(discriminatedSchema, 'ha').valid // true
v.validate(discriminatedSchema, 'make').valid // true
v.validate(discriminatedSchema, 'made').valid // false

// JSON parsing
const jsonSchema = v.fromJson(v.number())
v.validate(jsonSchema, '1').valid // true
v.validate(jsonSchema, '"1"').valid // false
v.validate(jsonSchema, 'and').valid // false

// Lazy evaluation
const lazySchema = v.lazy(() => v.number().pipe(v.gt(5)))
v.validate(lazySchema, 6).valid // true
v.validate(lazySchema, 5).valid // false

// Recursive schemas
const recursiveSchema = v.recursive(
	() =>
		v.object({
			value: v.number(),
			left: v.optional(recursiveSchema),
		}),
	'Node',
)
v.validate(recursiveSchema, { value: 1 }).valid // true
v.validate(recursiveSchema, {
	value: 1,
	left: { value: 2 },
}).valid // true
```

### Date & Time Validators

```typescript
// Time validation
const timeSchema = v.time()
const date = new Date()
v.validate(timeSchema, date).valid // true
v.validate(timeSchema, date.toDateString()).valid // true
v.validate(timeSchema, date.getTime()).valid // true
v.validate(timeSchema, false).valid // false

// Time comparisons
const afterSchema = v.time().pipe(v.after(new Date('2020-01-01')))
v.validate(afterSchema, new Date('2021-01-01')).valid // true
v.validate(afterSchema, new Date('2019-01-01')).valid // false

const beforeSchema = v.time().pipe(v.before(new Date('2020-01-01')))
v.validate(beforeSchema, new Date('2019-01-01')).valid // true
v.validate(beforeSchema, new Date('2021-01-01')).valid // false

// Time transformations
const timestampSchema = v.time().pipe(v.asStamp())
v.assert(timestampSchema, date) // date.getTime()

const isoSchema = v.time().pipe(v.asISOString())
v.assert(isoSchema, date) // date.toISOString()
```

### File Validators

```typescript
// File validation
const fileSchema = v.file()
v.validate(fileSchema, { type: 'image/png' }).valid // true
v.validate(fileSchema, { type: '' }).valid // false
v.validate(fileSchema, false).valid // false

// Specific file types
const imageSchema = v.file().pipe(v.image())
v.validate(imageSchema, { type: 'image/png' }).valid // true
v.validate(imageSchema, { type: 'text/plain' }).valid // false

const videoSchema = v.file().pipe(v.video())
v.validate(videoSchema, { type: 'video/mp4' }).valid // true

const audioSchema = v.file().pipe(v.audio())
v.validate(audioSchema, { type: 'audio/mp3' }).valid // true

// Custom file types
const pdfSchema = v.file().pipe(v.fileType('application/pdf'))
v.validate(pdfSchema, { type: 'application/pdf' }).valid // true
```

### Coercion

```typescript
// Type coercion
const coercedSchema = v.object({
	name: v.coerceString(),
	age: v.coerceNumber(),
	active: v.coerceBoolean(),
	created: v.coerceTime(),
})

// Automatically converts types before validation
const result = v.assert(coercedSchema, {
	name: 123, // -> "123"
	age: '25', // -> 25
	active: 1, // -> true
	created: '2023-01-01', // -> Date
})
```

## 🛠️ Utilities

### DataClass

A utility for creating data classes with automatic JSON serialization:

```typescript
import { DataClass } from 'valleyed'

class User extends DataClass<{ name: string; age: number }> {
	constructor(data: { name: string; age: number }) {
		super(data)
	}
}

const user = new User({ name: 'John', age: 30 })
console.log(user.toJSON()) // { name: 'John', age: 30 }
console.log(user.toString()) // '{"name":"John","age":30}'
```

### Geohash

Utilities for working with geohash encoding/decoding:

```typescript
import { geohash } from 'valleyed'

// Encode coordinates to geohash
const hash = geohash.encode([40.7128, -74.006])

// Decode geohash to coordinates
const [lat, lon] = geohash.decode(hash)

// Get neighboring geohashes
const neighbors = geohash.neighbors(hash)
console.log(neighbors.tl) // top-left neighbor
console.log(neighbors.tr) // top-right neighbor
// ... etc for all 8 neighbors
```

### Differ

Utilities for comparing and merging objects:

```typescript
import { differ } from 'valleyed'

const obj1 = { a: 1, b: 2 }
const obj2 = { a: 1, b: 3, c: 4 }

// Check equality
const isEqual = differ.equal(obj1, obj2) // false

// Get differences
const differences = differ.diff(obj1, obj2) // ['b', 'c']

// Merge objects
const merged = differ.merge(obj1, obj2) // { a: 1, b: 3, c: 4 }

// Create object from diff keys
const diffObj = differ.from(['user.name', 'user.age'])
// { user: { name: true, age: true } }
```

### Helper Functions

```typescript
import {
	capitalize,
	stripHTML,
	trimToLength,
	extractUrls,
	formatNumber,
	pluralize,
	groupBy,
	shuffleArray,
	chunkArray,
	compareTwoStrings,
	getRandomValue,
	addToArray,
	getPercentage,
	getRandomSample,
} from 'valleyed'

// String utilities
capitalize('hello world') // 'Hello World'
capitalize('test home') // 'Test Home'
stripHTML('<p>Hello</p>') // 'Hello'
stripHTML('<p>a<img src="/" /></p>') // 'a'
trimToLength('Long text here', 10) // 'Long text...'
extractUrls('Visit https://example.com')
// [{ original: 'https://example.com', normalized: 'https://example.com' }]

// Number utilities
formatNumber(1234567) // '1.2M'
formatNumber(1234.567, 2) // '1.23K'
pluralize(1, 'item', 'items') // 'item'
pluralize(2, 'item', 'items') // 'items'
getPercentage(25, 100) // 25

// Array utilities
groupBy(
	[
		{ type: 'A', val: 1 },
		{ type: 'B', val: 2 },
	],
	(x) => x.type,
)
// [{ key: 'A', values: [{type: 'A', val: 1}] }, { key: 'B', values: [{type: 'B', val: 2}] }]

shuffleArray([1, 2, 3, 4]) // [3, 1, 4, 2] (random order)
chunkArray([1, 2, 3, 4, 5], 2) // [[1, 2], [3, 4], [5]]
getRandomSample([1, 2, 3, 4, 5], 3) // [2, 4, 5] (3 random items)

// String comparison (Dice coefficient)
compareTwoStrings('abc', 'abc') // 1 (identical)
compareTwoStrings('abc', 'abcd') // 0.8 (very similar)
compareTwoStrings('abc', 'xyz') // 0 (completely different)

// Utility functions
getRandomValue() // 'lkj3h4kj2h3' (random string)
addToArray(
	[],
	item,
	(x) => x.id,
	(x) => x.priority,
) // sorted insertion
```

## 🔧 Advanced Usage

### Custom Validation Functions

```typescript
// Define custom validation logic
const customValidator = v.define<number, number>((input) => {
	if (input < 0) throw v.PipeError.root('must be positive', input)
	return input * 2
})

const schema = v.number().pipe(customValidator)
const result = v.assert(schema, 5) // 10
```

### Schema Compilation

```typescript
// Compile schema for better performance in loops
const schema = v.object({
	name: v.string().pipe(v.min(1)),
	age: v.number().pipe(v.gte(0)),
})

const compiledSchema = v.compile(schema)

// Use compiled schema (faster for repeated validations)
const result = compiledSchema(userData)
```

### JSON Schema Generation

```typescript
// Generate JSON Schema for documentation/tooling
const schema = v.object({
	name: v.string(),
	age: v.number().pipe(v.gte(0)),
	email: v.string().pipe(v.email()),
})

const jsonSchema = v.schema(schema)
console.log(jsonSchema)
// {
//   type: 'object',
//   properties: {
//     name: { type: 'string' },
//     age: { type: 'number', minimum: 0 },
//     email: { type: 'string', format: 'email' }
//   },
//   required: ['name', 'age', 'email']
// }
```

### Error Handling

```typescript
const schema = v.object({
	name: v.string().pipe(v.min(2)),
	age: v.number().pipe(v.gte(0)),
})

const result = v.validate(schema, { name: 'A', age: -1 })
if (!result.valid) {
	// Access structured error information
	result.messages.forEach(({ message, path, value }) => {
		console.log(`${path}: ${message} (got: ${value})`)
	})
	// Output:
	// name: must contain 2 or more characters (got: A)
	// age: must be greater than or equal to 0 (got: -1)

	// Or get formatted error string
	console.log(result.toString())
}
```

### Standard Schema Compatibility

```typescript
// Valleyed implements Standard Schema spec
const schema = v.string().pipe(v.email())

// Access standard schema methods
const result = schema['~standard'].validate('test@example.com')
if (result.issues) {
	console.log('Validation failed:', result.issues)
} else {
	console.log('Valid value:', result.value)
}
```

### Meta Information

```typescript
// Add metadata to schemas
const userSchema = v.meta(
	v.object({
		name: v.string(),
		age: v.number(),
	}),
	{
		title: 'User Schema',
		description: 'Schema for user data validation',
		examples: [{ name: 'John', age: 30 }],
	},
)

// Metadata appears in generated JSON schema
const jsonSchema = v.schema(userSchema)
console.log(jsonSchema.title) // 'User Schema'
console.log(jsonSchema.description) // 'Schema for user data validation'
```

## 🤝 Contributing

### Development Setup

```bash
# Clone repository
git clone https://github.com/your-org/valleyed.git
cd valleyed

# Install dependencies
npm install

# Run tests
npm test

# Run tests in watch mode
npm run test:watch

# Build package
npm run build

# Run type checking
npm run type-check
```

### Testing

The project uses Vitest for testing. Tests are organized by functionality:

- `tests/api/` - Core validation functionality
- `tests/utils/` - Utility function tests

Run specific test files:

```bash
npm test -- arrays.test.ts
npm test -- --grep "string validation"
```

### Code Style

- Use TypeScript for all code
- Follow existing code patterns
- Add tests for new features
- Update documentation for API changes

## 📜 License

MIT License - see LICENSE file for details.

---

Built with ❤️ for type-safe validation in TypeScript. Inspired by AJV but designed for modern TypeScript development with unmatched performance through function compilation.

**Key Advantages over other libraries:**

- **Performance**: Compiles to native JavaScript functions
- **Type Safety**: Full TypeScript integration with inference
- **Flexibility**: Transformations and custom logic anywhere in the pipeline
- **Standards**: Implements Standard Schema specification
- **DX**: Excellent error messages and debugging experience
