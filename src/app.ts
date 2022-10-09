import Schema from "./schema";
import BooleanSchema from "./schema/boolean";
import StringSchema from "./schema/string";

export default class CheckValue<T> {
  private _schema: { [Key in keyof T]: Schema } = Object.create(null);
  static string() {
    return new StringSchema();
  }

  static boolean() {
    return new BooleanSchema();
  }

  object(schema: { [Key in keyof T]: Schema }): this {
    this._schema = schema;
    return this;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  validate(data: { [Key in keyof T]: any }): { [Key in keyof T]: string } {
    let key: keyof typeof data;
    const _dat = { ...data };
    for (key in data) {
      _dat[key] = "";
      if (Object.prototype.hasOwnProperty.call(this._schema, key)) {
        let _message = "";
        this._schema[key].rule.forEach(({ method, message, length }) => {
          const result = !length
            ? method(data[key])
            : method(data[key], length);
          if (result.result) {
            _message = message !== "" ? message : `${[key]} ${result.message}`;
          }
        });

        _dat[key] = _message;
      }
    }
    return _dat;
  }
}
