import CheckValue from '../src';
import { IMethod } from '../src/schema';

const typeNumber: IMethod = (val: any) => {
  if (typeof val === "number") {
    return { result: false, message: "" };
  }
  return { result: true, message: "the type is no number" };
};

enum enumExample{
  NUMBER=0,
  STRING='string'
}
const enumMessage = 'invalid type!';
const enumSchema ={
  number:CheckValue.enumCheck(enumExample,{message:enumMessage}),
  string:CheckValue.enumCheck(enumExample,{message:enumMessage})
}

describe('Check enum', () => { 
  it('Check is fail ❎ validation' , () => {
    const _bad1 = new CheckValue().object(enumSchema).validate({number:false, string:'string'}, true)
    const _bad2 = new CheckValue().object(enumSchema).validate({number:0, string:[]}, true)
    expect(_bad1).toStrictEqual('invalid type!')
    expect(_bad2).toStrictEqual('invalid type!')
  });
  
  it('Check is pass ✅ validation' , () => {
    const _good = new CheckValue().object(enumSchema).validate({number:0, string:'string'}, true)
    expect(_good).toStrictEqual('')
  });
 })

describe("Custom method", () => {
  it("is example for good value", () => {
    const _good = new CheckValue<{ price: string }>()
      .object({ price: CheckValue.custom(typeNumber, {}) })
      .validate({ price: 2000 });
    expect(_good.price).toStrictEqual("");
  });

  it("is example for bad value", () => {
    const _bad = new CheckValue<{ price: string }>()
      .object({
        price: CheckValue.custom(typeNumber, {
          message: "Harus angka",
        }),
      })
      .validate({ price: "2000" });
    expect(_bad.price).toStrictEqual("Harus angka");
  });
});
