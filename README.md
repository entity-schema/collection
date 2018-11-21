# collection

Utils for working with collections of Entity Schema

## usage

`npm install @entity-schema/collection`

```javascript
const {
  resolveRefSchemas, isRootSchemaMap, assertRootSchemaMap, createRootSchemaMap
} = require( '@entity-schema/collection' )
```

### createRootSchemaMap

Takes an array of `RootSchema` and returns an object that maps from the `id` of
each to the associated `RootSchema`

```javascript
const foo = require( './foo.schema.json' )
const bar = require( './bar.schema.json' )

const rootSchemaMap = createRootSchemaMap( [ foo, bar ] )
```

### isRootSchemaMap

A predicate/type guard that returns a boolean indicating whether the passed in
value is a valid `RootSchemaMap`

```javascript
console.log( isRootSchemaMap( rootSchemaMap ) )
```

### assertRootSchemaMap

Throws an error if a `RootSchemaMap` is not valid detailing the reason why

```javascript
assertRootSchemaMap( rootSchemaMap )
```

### resolveRefSchemas

Takes an `id` and a `RootSchemaMap` and returns a new `RootSchema` where all
the `RefSchema` have been resolved. The `id` must be in the `RootSchemaMap` and
so must be the `id`s of any referenced `RootSchema`.

```javascript
const resolvedSchema = resolveRefSchemas(
  'http://example.com/schemas/foo', rootSchemaMap
)
```

## license

MIT License

Copyright (c) 2018 Nik Coughlin

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.