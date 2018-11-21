"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const predicates_1 = require("@entity-schema/predicates");
const objectParentInJson = require("./object-parent-in.schema.json");
const objectChildInJson = require("./object-child-in.schema.json");
const propertyInJson = require("./property-in.schema.json");
const expectObjectParentJson = require("./expect-object-parent.schema.json");
predicates_1.assertObjectSchema(objectParentInJson);
predicates_1.assertObjectSchema(objectChildInJson);
predicates_1.assertStringSchema(propertyInJson);
predicates_1.assertObjectSchema(expectObjectParentJson);
exports.objectParentInSchema = objectParentInJson;
exports.objectChildInSchema = objectChildInJson;
exports.propertyInSchema = propertyInJson;
exports.expectObjectParentSchema = expectObjectParentJson;
//# sourceMappingURL=index.js.map