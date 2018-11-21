"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Mapper = require("@mojule/mapper");
const predicates_1 = require("@entity-schema/predicates");
const root_schema_map_1 = require("./root-schema-map");
exports.resolveRefSchemas = (id, rootSchemaMap) => {
    root_schema_map_1.assertRootSchemaMap(rootSchemaMap);
    const rootSchema = rootSchemaMap[id];
    predicates_1.assertRootSchema(rootSchema, `RootSchemaMap['${id}']`);
    const predicates = {
        $ref: predicates_1.isRefSchema
    };
    const map = {
        /*
          According to the spec, any schema with a $ref property should be entirely
          replaced with the schema it references, not extended
        */
        $ref: (value, { mapper }) => {
            const target = rootSchemaMap[value.$ref];
            predicates_1.assertRootSchema(target, `RootSchemaMap['${value.$ref}']`);
            return mapper(target);
        }
    };
    const flatten = Mapper({ map, predicates });
    const flattenedSchema = flatten(rootSchemaMap[id]);
    return flattenedSchema;
};
//# sourceMappingURL=resolve-ref-schemas.js.map