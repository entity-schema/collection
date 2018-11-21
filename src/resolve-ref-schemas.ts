import * as Mapper from '@mojule/mapper'
import {
  assertRootSchema, isRefSchema, RootSchema
} from '@entity-schema/predicates'

import { RootSchemaMap, assertRootSchemaMap } from './root-schema-map'

export const resolveRefSchemas = ( id: string, rootSchemaMap: RootSchemaMap ) => {
  assertRootSchemaMap( rootSchemaMap )

  const rootSchema = rootSchemaMap[ id ]

  assertRootSchema( rootSchema, `RootSchemaMap['${ id }']` )

  const predicates = {
    $ref: isRefSchema
  }

  const map = {
    /*
      According to the spec, any schema with a $ref property should be entirely
      replaced with the schema it references, not extended
    */
    $ref: ( value, { mapper } ) => {
      const target = rootSchemaMap[ value.$ref ]

      assertRootSchema( target, `RootSchemaMap['${ value.$ref }']` )

      return mapper( target )
    }
  }

  const flatten = Mapper( { map, predicates } )
  const flattenedSchema = <RootSchema>flatten( rootSchemaMap[ id ] )

  return flattenedSchema
}
