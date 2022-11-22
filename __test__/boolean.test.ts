import CheckValue from '../src';

const good = { truthy: true, falsy: false, required: false };
const bad = { truthy: false, falsy: true, required: "" };
const schema = {
  truthy: CheckValue.boolean().truthy(),
  falsy: CheckValue.boolean().falsy(),
  required: CheckValue.boolean().required(),
};

const _good = new CheckValue<typeof schema>().object(schema).validate(good);
const _bad = new CheckValue<typeof schema>().object(schema).validate(bad);

const _badSingle = new CheckValue()
  .object({
    truthy: CheckValue.boolean(),
  })
  .validate({ truthy: null }, true);

describe("Boolean Schema", () => {
  describe("Result single string", () => {
    it("must be boolean", () => {
      expect(_badSingle).toStrictEqual("truthy: must be boolean");
    });
  });
  describe("Good Value", () => {
    it("is truthy", () => {
      expect(_good.truthy).toStrictEqual("");
    });
    it("is falsy", () => {
      expect(_good.falsy).toStrictEqual("");
    });
    it("is required", () => {
      expect(_good.required).toStrictEqual("");
    });
  });
  describe("Bad Value", () => {
    it("truthy must be true", () => {
      expect(_bad.truthy).toStrictEqual("truthy must be true");
    });
    it("falsy must be falsy", () => {
      expect(_bad.falsy).toStrictEqual("falsy must be falsy");
    });
    it("required is required", () => {
      expect(_bad.required).toStrictEqual("required must be boolean");
    });
  });
});
