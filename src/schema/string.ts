import Schema from '.';
import { ESchemaName } from '../util';
import StringValidation from '../validation/string';

export default class StringSchema extends Schema {
  constructor() {
    super(ESchemaName.STRING);
    this.rule.push({ method: StringValidation.isString, message: "" });
  }

  alpha(message = "") {
    this.rule.push({ method: StringValidation.alpha, message });
    return this;
  }

  alphaNum(message = "") {
    this.rule.push({ method: StringValidation.alphaNum, message });
    return this;
  }

  number(message = "") {
    this.rule.push({ method: StringValidation.numeric, message });
    return this;
  }

  email(message = "") {
    this.rule.push({ method: StringValidation.email, message });
    return this;
  }

  max(length: number, message = "") {
    this.rule.push({ method: StringValidation.max, message, value2: length });
    return this;
  }

  min(length: number, message = "") {
    this.rule.push({ method: StringValidation.min, message, value2: length });
    return this;
  }

  url(message = "") {
    this.rule.push({ method: StringValidation.url, message });
    return this;
  }

  uuid(message = "") {
    this.rule.push({ method: StringValidation.uuid, message });
    return this;
  }
}
