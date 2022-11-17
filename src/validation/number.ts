import Validation, { IResult } from '.';
import { isNumber } from '../util';

export default class NumberValidation extends Validation {
  static isNumber(num: number): IResult {
    if (!isNumber(num)) {
      return { result: true, message: "must be number" };
    }
    return { result: false, message: "" };
  }

  static max(num: number, max?: number): IResult {
    if (!max) {
      throw new Error("Length is required");
    }
    if (num <= max && isNumber(num)) {
      return {
        result: false,
        message: "",
      };
    }
    return { result: true, message: `must be less than or equal to ${max}` };
  }

  static min(num: number, min?: number): IResult {
    if (!min) {
      throw new Error("Length is required");
    }
    if (num >= min && isNumber(num)) {
      return {
        result: false,
        message: "",
      };
    }
    return { result: true, message: `must be greater than or equal to ${min}` };
  }

  static moreThan(num: number, more?: number): IResult {
    if (!more) {
      throw new Error("More value is required");
    }
    if (num > more && isNumber(num)) {
      return {
        result: false,
        message: "",
      };
    }
    return {
      result: true,
      message: `must be greater than to ${more}`,
    };
  }

  static lessThan(num: number, less?: number): IResult {
    if (!less) {
      throw new Error("Less value is required");
    }
    if (num < less && isNumber(num)) {
      return {
        result: false,
        message: "",
      };
    }
    return { result: true, message: `must be less than to ${less}` };
  }

  static positive(num: number): IResult {
    if (num > 0 && isNumber(num)) {
      return {
        result: false,
        message: "",
      };
    }
    return {
      result: true,
      message: "must be a positive number",
    };
  }

  static negative(num: number): IResult {
    if (num < 0 && isNumber(num)) {
      return {
        result: false,
        message: "",
      };
    }
    return { result: true, message: "must be a negative number" };
  }

  static integer(num: number): IResult {
    if (Number.isInteger(num)) {
      return {
        result: false,
        message: "",
      };
    }
    return { result: true, message: "must be an integer" };
  }
}
