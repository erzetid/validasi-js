import Schema from ".";
import { ESchemaName } from "../util";

export default class NumberSchema extends Schema {
  constructor() {
    super(ESchemaName.NUMBER);
  }
}
