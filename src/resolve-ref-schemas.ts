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
    $ref: ( value, { mapper, parents } ) => {
      if( value.id ) parents.add( value.id )

      // we can look into using a proxy object or something but for now disallow
      // https://mattallan.org/posts/json-schema-references/
      if( parents.has( value.$ref ) )
        throw Error( `Circular reference: ${ value.$ref }`)

      const target = rootSchemaMap[ value.$ref ]

      assertRootSchema( target, `RootSchemaMap['${ value.$ref }']` )

      return mapper( target )
    }
  }

  const parents = new Set<string>()

  parents.add( id )

  const flatten = Mapper( { map, predicates, parents } )
  const flattenedSchema = <RootSchema>flatten( rootSchemaMap[ id ] )

  return flattenedSchema
}
