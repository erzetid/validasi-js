/* eslint-disable @typescript-eslint/no-explicit-any */
import { IMethod } from "../schema";

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
      return { result: false, message: "" };
    }
    return { result: true, message: "wrong type!" };
  };
};
/**
 * Fungsi ini biasa digunakan untuk mengaktifkan/menonaktifkan tombol pada frontend.
 * (akan mereturn false jika ada validasi yang salah).
 * @param {{[Key in keyof T]: any;}} data - Data hasil dari validasi object.
 * @return {boolean} Akan mereturn false jika ada validasi yang salah.
 */

export const validationSubmit = <T>(data: {
  [Key in keyof T]: any;
}): boolean => {
  let key: keyof typeof data;
  for (key in data) {
    const err = data[key];
    if (err !== "") return false;
  }
  return true;
};
