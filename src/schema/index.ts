import { ESchemaName } from '../util';
import Validation, { IResult } from '../validation';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IMethod = (value: any, value2?: number) => IResult;

export interface IRule {
  method: IMethod;
  message: string;
  value2?: number;
}

export interface ISchema {
  name: ESchemaName;
  rule: IRule[];
  required(message: string): this;
}

export default class Schema implements ISchema {
  public readonly rule: IRule[] = [];
  constructor(public readonly name: ESchemaName) {}

  required(message = ""): this {
    this.rule.push({ method: Validation.required, message });
    return this;
  }
}

export class CustomSchema extends Schema {
  constructor(method: IMethod, option: { value2?: number; message?: string }) {
    super(ESchemaName.CUSTOM);
    this._custom(method, option);
  }
  private _custom(
    method: IMethod,
    option: { value2?: number; message?: string }
  ): this {
    const { value2, message } = option;
    const _message = message ? message : "";
    this.rule.push({ method, message: _message, value2 });
    return this;
  }
}
