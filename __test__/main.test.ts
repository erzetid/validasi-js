import CheckValue from '../src';
import { IMethod } from '../src/schema';

const typeNumber: IMethod = (val: any) => {
  if (typeof val === "number") {
    return { result: false, message: "" };
  }
  return { result: true, message: "the type is no number" };
};

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
