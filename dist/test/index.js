"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assert = require("assert");
const __1 = require("..");
const fixtures_1 = require("./fixtures");
const rootSchemas = [
    fixtures_1.objectParentInSchema, fixtures_1.objectChildInSchema, fixtures_1.propertyInSchema
];
const circularSchemas = [fixtures_1.circularASchema, fixtures_1.circularBSchema];
describe('collection', () => {
    describe('RootSchemaMap', () => {
        it('createRootSchemaMap', () => {
            assert.doesNotThrow(() => {
                __1.createRootSchemaMap(rootSchemas);
            });
        });
        it('createRootSchemaMap must be a non-empty array', () => {
            assert.throws(() => __1.createRootSchemaMap(null), {
                name: 'TypeError',
                message: 'Expected rootSchemas to be a non-empty array of RootSchema'
            });
            assert.throws(() => __1.createRootSchemaMap([]), {
                name: 'TypeError',
                message: 'Expected rootSchemas to be a non-empty array of RootSchema'
            });
            assert.throws(() => __1.createRootSchemaMap([{}]), {
                name: 'TypeError',
                message: 'Expected rootSchemas to be a non-empty array of RootSchema'
            });
        });
        it('createRootSchemaMap must not have duplicate ids', () => {
            assert.throws(() => __1.createRootSchemaMap([fixtures_1.objectParentInSchema, fixtures_1.objectParentInSchema]), {
                name: 'Error',
                message: `Duplicate 'id' property '${fixtures_1.objectParentInSchema.id}'`
            });
        });
        it('createRootSchemaMap must not have duplicate titles', () => {
            const objectParentInSchemaClone = JSON.parse(JSON.stringify(fixtures_1.objectParentInSchema));
            objectParentInSchemaClone.id = 'id';
            assert.throws(() => __1.createRootSchemaMap([fixtures_1.objectParentInSchema, objectParentInSchemaClone]), {
                name: 'Error',
                message: `Duplicate 'title' property '${fixtures_1.objectParentInSchema.title}'`
            });
        });
        it('isRootSchemaMap', () => {
            const rootSchemaMap = __1.createRootSchemaMap(rootSchemas);
            assert(__1.isRootSchemaMap(rootSchemaMap));
        });
        it('isRootSchemaMap fails', () => {
            assert(!__1.isRootSchemaMap({}));
        });
        it('assertRootSchemaMap', () => {
            const rootSchemaMap = __1.createRootSchemaMap(rootSchemas);
            assert.doesNotThrow(() => {
                __1.assertRootSchemaMap(rootSchemaMap);
            });
        });
        it('assertRootSchemaMap not an object', () => {
            assert.throws(() => __1.assertRootSchemaMap([]), {
                name: 'TypeError',
                message: 'Expected RootSchemaMap to be an object'
            });
        });
        it('assertRootSchemaMap has properties', () => {
            assert.throws(() => __1.assertRootSchemaMap({}), {
                name: 'TypeError',
                message: 'Expected RootSchemaMap to contain at least one RootSchema'
            });
        });
    });
    describe('resolveRefSchemas', () => {
        it('resolves RefSchemas', () => {
            const rootSchemaMap = __1.createRootSchemaMap(rootSchemas);
            const parentOutSchema = __1.resolveRefSchemas('http://workingspec.com/schema/object-parent-in', rootSchemaMap);
            assert.deepEqual(parentOutSchema, fixtures_1.expectObjectParentSchema);
        });
        it('does not allow circular references', () => {
            const rootSchemaMap = __1.createRootSchemaMap(circularSchemas);
            assert.throws(() => __1.resolveRefSchemas(fixtures_1.circularASchema.id, rootSchemaMap), {
                name: 'Error',
                message: `Circular reference: ${fixtures_1.circularASchema.id}`
            });
        });
    });
});
//# sourceMappingURL=index.js.map