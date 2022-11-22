import { IMethod } from '../schema';

export enum ESchemaName {
  STRING = "str",
  NUMBER = "num",
  BOOLEAN = "bool",
  CUSTOM = "custom",
}

export const isString = (val: string) => typeof val === "string";
export const isBoolean = (val: boolean) => typeof val === "boolean";
export const isNumber = (val: number) => typeof val === "number";

export const checkEnum = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  enumType: { [s: string]: any } | ArrayLike<any>
): IMethod => {
  return (type: string) => {
    if (Object.values<string>(enumType).includes(type)) {
      return { result: false, message: '' };
    }
    return { result: true, message: 'wrong type!' };
  };
};
