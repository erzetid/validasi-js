/* eslint-disable @typescript-eslint/no-explicit-any */
import Schema, { CustomSchema, IMethod } from './schema';
import BooleanSchema from './schema/boolean';
import NumberSchema from './schema/number';
import StringSchema from './schema/string';
import { checkEnum } from './util';

/**
 * @static method untuk menseting validasi yang akan digunakan pada objek (membuat `schema`)
 * @public method untuk menginisialisasi schema dan objek yang akan di validasi tapi sebelumnya harus
 * menginstance class ini terlebih dahulu.
 */
export default class CheckValue<T> {
  private _schema: { [Key in keyof T]: Schema } = Object.create(null);

  /**
   * @static Membuat `schema` validasi string
   * @returns {StringSchema}
   */
  static string(): StringSchema {
    return new StringSchema();
  }

  /**
   * @static Membuat `schema` validasi boolean
   * @returns {BooleanSchema}
   */
  static boolean(): BooleanSchema {
    return new BooleanSchema();
  }

  /**
   * @static Membuat `schema` validasi number
   * @returns {NumberSchema}
   */
  static number(): NumberSchema {
    return new NumberSchema();
  }

  /**
   * @static Membuat `schema` validasi custom
   * @returns {CustomSchema}
   */
  static custom(method: IMethod, option: { message?: string }): CustomSchema {
    return new CustomSchema(method, option);
  }

  static enumCheck(
    enumType: { [s: string]: any } | ArrayLike<any>,
    option: { message?: string }
  ) {
    return this.custom(checkEnum(enumType), option);
  }

  /**
   * Menginisialisasi `schema`
   * @param schema {{ [Key in keyof T]: Schema }}
   * @returns {this}
   */
  object(schema: { [Key in keyof T]: Schema }): this {
    this._schema = schema;
    return this;
  }

  /**
   *
   * @param data {{ [Key in keyof T]: any }} Objek yang akan dicek
   * @returns {{ [Key in keyof T]: string }}
   * Akan mengembalikan objek hasil validasi, jika lolos validasi maka
   * semua `key` atau `property` didalam objek berisi `string` kosong, begitu juga sebaliknya
   */
  validate(data: { [Key in keyof T]: any }): { [Key in keyof T]: string };
  /**
   *
   * @param data {{ [Key in keyof T]: any }} Objek yang akan dicek
   * @param isString {boolean} Jika mengisinya dengan `true` maka hanya akan mengembalikan satu hasil validasi
   * yaitu jika lolos validasi akan berisi `string` kosong, kalau tidak lolos akan mengembalikan `string` yang
   * berisi `message` yang paling awal tidak lolos validasi.
   * @returns `string`
   */
  validate(data: { [Key in keyof T]: any }, isString: boolean): string;

  // ~TODO: Ringkas ini validate single
  validate(
    data: { [Key in keyof T]: any },
    isString?: boolean
  ): { [Key in keyof T]: string } | string {
    if (isString) {
      return this._validate(data);
    }
    let key: keyof typeof data;
    const _dat = { ...data };
    for (key in data) {
      _dat[key] = "";
      let _message = "";
      if (Object.prototype.hasOwnProperty.call(this._schema, key)) {
        this._schema[key].rule.forEach(({ method, message, value2 }) => {
          const result = !value2
            ? method(data[key])
            : method(data[key], value2);
          // jika ada yang salah dalam validasi
          if (result.result) {
            // jika custom message kosong
            _message = message !== "" ? message : `${[key]} ${result.message}`;
          }
        });
      } else {
        _message = `not defined in schema`;
      }
      _dat[key] = _message;
    }
    return _dat;
  }

  private _validate(data: { [Key in keyof T]: any }): string {
    let key: keyof typeof data;
    const _dat = { ...data };
    // membuat message berisi string kosong
    let _message = "";
    for (key in data) {
      _dat[key] = "";
      if (Object.prototype.hasOwnProperty.call(this._schema, key)) {
        this._schema[key].rule.forEach(({ method, message, value2 }) => {
          const result = !value2
            ? method(data[key])
            : method(data[key], value2);
          // jika ada yang salah dalam validasi
          if (result.result) {
            // jika custom message kosong
            _message = message !== "" ? message : `${[key]}: ${result.message}`;
            return; // akan memberhentikan looping validasi objek
          }
        });
      } else {
        // Jika ada data (key) yang tidak ada dalam schema
        _message = `${[key]}: not defined in schema`;
      }
    }
    return _message;
  }
}
