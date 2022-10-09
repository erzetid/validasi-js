import { IResult } from ".";
import Validation from ".";
import { isString } from "../util";

export default class StringValidation extends Validation {
  static alpha(str: string): IResult {
    const rAlpha = /^[a-zA-Z() ]+$/.test(str);
    if (rAlpha && isString(str)) {
      return { result: false, message: "" };
    }
    return { result: true, message: "must only contain alpha characters" };
  }

  static numeric(str: string): IResult {
    const rNumeric = /^[0-9]+$/.test(str);
    if (rNumeric && isString(str)) {
      return { result: false, message: "" };
    }
    return { result: true, message: "must only contain numeric characters" };
  }

  static alphaNum(str: string): IResult {
    const rAlphaNum = /^[a-zA-Z0-9 ]+$/.test(str);
    if (rAlphaNum && isString(str)) {
      return { result: false, message: "" };
    }
    return {
      result: true,
      message: "must only contain alpha-numeric characters",
    };
  }

  static email(str: string): IResult {
    const rEmail =
      /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
        str
      ) && typeof str === "string";
    if (rEmail && isString(str)) {
      return { result: false, message: "" };
    }
    return { result: true, message: "must be a valid email" };
  }

  static max(str: string, max?: number): IResult {
    if (!max) {
      throw new Error("Length is required");
    }
    if (str.length <= max && isString(str)) {
      return { result: false, message: "" };
    }
    return { result: true, message: `must be at most ${max} characters` };
  }

  static min(str: string, min?: number): IResult {
    if (!min) {
      throw new Error("Length is required");
    }
    if (str.length >= min && isString(str)) {
      return { result: false, message: "" };
    }
    return { result: true, message: `must be at least ${min} characters` };
  }

  static url(str: string): IResult {
    const rAlphaNum =
      /^((https?|ftp):)?\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(
        str
      );
    if (rAlphaNum && isString(str)) {
      return { result: false, message: "" };
    }
    return {
      result: true,
      message: "must be a valid url",
    };
  }

  static uuid(str: string): IResult {
    const rAlphaNum =
      /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i.test(
        str
      );
    if (rAlphaNum && isString(str)) {
      return { result: false, message: "" };
    }
    return {
      result: true,
      message: "must be a valid UUID",
    };
  }
}
