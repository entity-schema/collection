"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const is_1 = require("@mojule/is");
const predicates_1 = require("@entity-schema/predicates");
exports.isRootSchemaMap = (value) => {
    try {
        exports.assertRootSchemaMap(value);
    }
    catch (_a) {
        return false;
    }
    return true;
};
exports.assertRootSchemaMap = (rootSchemaMap, name = 'RootSchemaMap') => {
    if (!is_1.is.object(rootSchemaMap))
        throw TypeError(`Expected ${name} to be an object`);
    const ids = Object.keys(rootSchemaMap);
    if (ids.length < 1)
        throw TypeError(`Expected ${name} to contain at least one RootSchema`);
    ids.forEach(id => {
        predicates_1.assertRootSchema(rootSchemaMap[id], `${name}['${id}']`);
    });
};
exports.createRootSchemaMap = (rootSchemas) => {
    if (!is_1.is.array(rootSchemas) || rootSchemas.length === 0 ||
        !rootSchemas.every(predicates_1.isRootSchema))
        throw TypeError('Expected rootSchemas to be a non-empty array of RootSchema');
    const rootSchemaMap = {};
    const idSet = new Set();
    const titleSet = new Set();
    rootSchemas.forEach(schema => {
        if (idSet.has(schema.id))
            throw Error(`Duplicate 'id' property '${schema.id}'`);
        if (titleSet.has(schema.title))
            throw Error(`Duplicate 'title' property '${schema.title}'`);
        rootSchemaMap[schema.id] = schema;
        idSet.add(schema.id);
        titleSet.add(schema.title);
    });
    return rootSchemaMap;
};
//# sourceMappingURL=root-schema-map.js.map