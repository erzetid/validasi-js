export enum ESchemaName {
  STRING = "str",
  NUMBER = "num",
  BOOLEAN = "bool",
}

export const isString = (val: string) => typeof val === "string";
export const isBoolean = (val: boolean) => typeof val === "boolean";
export const isNumber = (val: boolean) => typeof val === "number";
