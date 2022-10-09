import Schema from ".";
import { ESchemaName } from "../util";
import BooleanValidation from "../validation/boolean";

export default class BooleanSchema extends Schema {
  constructor() {
    super(ESchemaName.BOOLEAN);
  }
  truthy(message = "") {
    this.rule.push({ method: BooleanValidation.truthy, message });
    return this;
  }
  falsy(message = "") {
    this.rule.push({ method: BooleanValidation.falsy, message });
    return this;
  }
  required(message = "") {
    this.rule.push({ method: BooleanValidation.required, message });
    return this;
  }
}
