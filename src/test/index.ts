import * as assert from 'assert'
import { RootSchema } from '@entity-schema/predicates'

import {
  createRootSchemaMap, isRootSchemaMap, assertRootSchemaMap, resolveRefSchemas
} from '..'

import {
  objectParentInSchema, objectChildInSchema, propertyInSchema,
  expectObjectParentSchema
} from './fixtures'

const rootSchemas: RootSchema[] = [
  objectParentInSchema, objectChildInSchema, propertyInSchema
]

describe( 'collection', () => {
  describe( 'RootSchemaMap', () => {
    it( 'createRootSchemaMap', () => {
      assert.doesNotThrow( () => {
        createRootSchemaMap( rootSchemas )
      })
    })

    it( 'createRootSchemaMap must be a non-empty array', () => {
      assert.throws(
        () => createRootSchemaMap( <any>null ),
        {
          name: 'TypeError',
          message: 'Expected rootSchemas to be a non-empty array of RootSchema'
        }
      )

      assert.throws(
        () => createRootSchemaMap( [] ),
        {
          name: 'TypeError',
          message: 'Expected rootSchemas to be a non-empty array of RootSchema'
        }
      )

      assert.throws(
        () => createRootSchemaMap( [ <any>{} ] ),
        {
          name: 'TypeError',
          message: 'Expected rootSchemas to be a non-empty array of RootSchema'
        }
      )
    } )

    it( 'createRootSchemaMap must not have duplicate ids', () => {
      assert.throws(
        () => createRootSchemaMap( [ objectParentInSchema, objectParentInSchema ] ),
        {
          name: 'Error',
          message: `Duplicate 'id' property '${ objectParentInSchema.id }'`
        }
      )
    })

    it( 'createRootSchemaMap must not have duplicate titles', () => {
      const objectParentInSchemaClone = <RootSchema>JSON.parse(
        JSON.stringify( objectParentInSchema )
      )

      objectParentInSchemaClone.id = 'id'

      assert.throws(
        () => createRootSchemaMap(
          [ objectParentInSchema, objectParentInSchemaClone ]
        ),
        {
          name: 'Error',
          message: `Duplicate 'title' property '${ objectParentInSchema.title }'`
        }
      )
    } )

    it( 'isRootSchemaMap', () => {
      const rootSchemaMap = createRootSchemaMap( rootSchemas )

      assert( isRootSchemaMap( rootSchemaMap ) )
    })

    it( 'isRootSchemaMap fails', () => {
      assert( !isRootSchemaMap( {} ) )
    } )

    it( 'assertRootSchemaMap', () => {
      const rootSchemaMap = createRootSchemaMap( rootSchemas )

      assert.doesNotThrow( () => {
        assertRootSchemaMap( rootSchemaMap )
      })
    })

    it( 'assertRootSchemaMap not an object', () => {
      assert.throws(
        () => assertRootSchemaMap( [] ),
        {
          name: 'TypeError',
          message: 'Expected RootSchemaMap to be an object'
        }
      )
    })

    it( 'assertRootSchemaMap has properties', () => {
      assert.throws(
        () => assertRootSchemaMap( {} ),
        {
          name: 'TypeError',
          message: 'Expected RootSchemaMap to contain at least one RootSchema'
        }
      )
    } )
  })

  describe( 'resolveRefSchemas', () => {
    it( 'resolves RefSchemas', () => {
      const rootSchemaMap = createRootSchemaMap( rootSchemas )

      const parentOutSchema = resolveRefSchemas(
        'http://workingspec.com/schema/object-parent-in',
        rootSchemaMap
      )

      assert.deepEqual( parentOutSchema, expectObjectParentSchema )
    })
  })
})
