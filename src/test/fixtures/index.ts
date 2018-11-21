import {
  ObjectSchema, StringSchema, assertObjectSchema, assertStringSchema,
  RootSchema
} from '@entity-schema/predicates'

import * as objectParentInJson from './object-parent-in.schema.json'
import * as objectChildInJson from './object-child-in.schema.json'
import * as propertyInJson from './property-in.schema.json'
import * as expectObjectParentJson from './expect-object-parent.schema.json'

assertObjectSchema( objectParentInJson )
assertObjectSchema( objectChildInJson )
assertStringSchema( propertyInJson )
assertObjectSchema( expectObjectParentJson )

export const objectParentInSchema = <ObjectSchema & RootSchema>objectParentInJson
export const objectChildInSchema = <ObjectSchema & RootSchema>objectChildInJson
export const propertyInSchema = <StringSchema & RootSchema>propertyInJson
export const expectObjectParentSchema = <ObjectSchema & RootSchema>expectObjectParentJson
