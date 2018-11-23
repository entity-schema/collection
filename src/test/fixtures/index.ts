import {
  ObjectSchema, StringSchema, assertObjectSchema, assertStringSchema,
  RootSchema
} from '@entity-schema/predicates'

import * as objectParentInJson from './object-parent-in.schema.json'
import * as objectChildInJson from './object-child-in.schema.json'
import * as propertyInJson from './property-in.schema.json'
import * as expectObjectParentJson from './expect-object-parent.schema.json'
import * as circularAJson from './circular-a.schema.json'
import * as circularBJson from './circular-b.schema.json'

assertObjectSchema( objectParentInJson )
assertObjectSchema( objectChildInJson )
assertStringSchema( propertyInJson )
assertObjectSchema( expectObjectParentJson )
assertObjectSchema( circularAJson )
assertObjectSchema( circularBJson )

export const objectParentInSchema = <ObjectSchema & RootSchema>objectParentInJson
export const objectChildInSchema = <ObjectSchema & RootSchema>objectChildInJson
export const propertyInSchema = <StringSchema & RootSchema>propertyInJson
export const expectObjectParentSchema = <ObjectSchema & RootSchema>expectObjectParentJson
export const circularASchema = <ObjectSchema & RootSchema>circularAJson
export const circularBSchema = <ObjectSchema & RootSchema>circularBJson
