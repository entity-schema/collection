import { is } from '@mojule/is'
import {
  RootSchema, isRootSchema, assertRootSchema
} from '@entity-schema/predicates'

export interface RootSchemaMap {
  [ id: string ]: RootSchema
}

export const isRootSchemaMap = ( value ): value is RootSchemaMap => {
  try {
    assertRootSchemaMap( value )
  } catch {
    return false
  }

  return true
}

export const assertRootSchemaMap = (
  rootSchemaMap, name = 'RootSchemaMap'
) => {
  if( !is.object( rootSchemaMap ) )
    throw TypeError( `Expected ${ name } to be an object` )

  const ids = Object.keys( rootSchemaMap )

  if( ids.length < 1 )
    throw TypeError( `Expected ${ name } to contain at least one RootSchema` )

  ids.forEach( id => {
    assertRootSchema( rootSchemaMap[ id ], `${ name }['${ id }']` )
  })
}

export const createRootSchemaMap = ( rootSchemas: RootSchema[] ) => {
  if(
    !is.array( rootSchemas ) || rootSchemas.length === 0 ||
    !rootSchemas.every( isRootSchema )
  ) throw TypeError(
    'Expected rootSchemas to be a non-empty array of RootSchema'
  )

  const rootSchemaMap: RootSchemaMap = {}
  const idSet = new Set<string>()
  const titleSet = new Set<string>()

  rootSchemas.forEach( schema => {
    if ( idSet.has( schema.id ) )
      throw Error( `Duplicate 'id' property '${ schema.id }'` )

    if ( titleSet.has( schema.title ) )
      throw Error( `Duplicate 'title' property '${ schema.title }'` )

    rootSchemaMap[ schema.id ] = schema

    idSet.add( schema.id )
    titleSet.add( schema.title )
  })

  return rootSchemaMap
}
