import Schema from '.';
import { ESchemaName } from '../util';
import NumberValidation from '../validation/number';

export default class NumberSchema extends Schema {
  constructor() {
    super(ESchemaName.NUMBER);
    this.rule.push({ method: NumberValidation.isNumber, message: "" });
  }

  max(length: number, message = "") {
    this.rule.push({ method: NumberValidation.max, message, value2: length });
    return this;
  }

  min(length: number, message = "") {
    this.rule.push({ method: NumberValidation.min, message, value2: length });
    return this;
  }

  lessThan(less: number, message = "") {
    this.rule.push({
      method: NumberValidation.lessThan,
      message,
      value2: less,
    });
    return this;
  }

  moreThan(more: number, message = "") {
    this.rule.push({
      method: NumberValidation.moreThan,
      message,
      value2: more,
    });
    return this;
  }

  positive(message = "") {
    this.rule.push({ method: NumberValidation.positive, message });
    return this;
  }

  negative(message = "") {
    this.rule.push({ method: NumberValidation.negative, message });
    return this;
  }

  integer(message = "") {
    this.rule.push({ method: NumberValidation.integer, message });
    return this;
  }
}
