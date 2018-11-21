import { RootSchema } from '@entity-schema/predicates';
export interface RootSchemaMap {
    [id: string]: RootSchema;
}
export declare const isRootSchemaMap: (value: any) => value is RootSchemaMap;
export declare const assertRootSchemaMap: (rootSchemaMap: any, name?: string) => void;
export declare const createRootSchemaMap: (rootSchemas: RootSchema[]) => RootSchemaMap;
