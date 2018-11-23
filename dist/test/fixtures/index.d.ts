import { ObjectSchema, StringSchema, RootSchema } from '@entity-schema/predicates';
export declare const objectParentInSchema: ObjectSchema & RootSchema;
export declare const objectChildInSchema: ObjectSchema & RootSchema;
export declare const propertyInSchema: StringSchema & RootSchema;
export declare const expectObjectParentSchema: ObjectSchema & RootSchema;
export declare const circularASchema: ObjectSchema & RootSchema;
export declare const circularBSchema: ObjectSchema & RootSchema;
