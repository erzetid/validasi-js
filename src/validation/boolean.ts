import Validation, { IResult } from '.';
import { isBoolean } from '../util';

export default class BooleanValidation extends Validation {
  static isBoolean(bool: boolean) {
    if (!isBoolean(bool)) {
      return { result: true, message: "must be boolean" };
    }
    return { result: false, message: "" };
  }

  static truthy(bool: boolean): IResult {
    if (isBoolean(bool) && bool) {
      return { result: false, message: "" };
    }
    return { result: true, message: "must be true" };
  }
  static falsy(bool: boolean): IResult {
    if (isBoolean(bool) && !bool) {
      return { result: false, message: "" };
    }
    return { result: true, message: "must be falsy" };
  }
  static required(bool: boolean): IResult {
    if (!isBoolean(bool)) {
      return { result: true, message: "must be boolean" };
    }
    return { result: false, message: "" };
  }
}
