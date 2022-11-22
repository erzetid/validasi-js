import CheckValue from '../src';

const good = {
  alpha: "Muhammad Andri Fahrizal",
  alphaNum: "Alpha 26",
  numeric: "2500",
  email: "fahrizalm14@gmail.com",
  url: "http://stasiunfile.com",
  uuid: "2025445e-8ac6-49ae-8f4b-79d70063286b",
  required: "2025445e-8ac6-49ae-8f4b-79d70063286b",
  max: "abc",
  min: "12345678",
};
const bad = {
  alpha: [],
  alphaNum: null,
  numeric: undefined,
  email: "2025445e-8ac6-49ae-8f4b-79d70063286b",
  url: "fahrizalm14@gmail.com",
  uuid: "http://stasiunfile.com",
  required: false,
  max: "2025445e-8ac6-49ae-8f4b-79d70063286b",
  min: "abc",
};
const schema = {
  alpha: CheckValue.string().alpha(),
  alphaNum: CheckValue.string().alphaNum(),
  numeric: CheckValue.string().number(),
  email: CheckValue.string().email(),
  url: CheckValue.string().url(),
  uuid: CheckValue.string().uuid(),
  required: CheckValue.string().required(),
  max: CheckValue.string().max(5),
  min: CheckValue.string().min(5),
};
// const check = new CheckValue<typeof good>();
const _good = new CheckValue<typeof schema>().object(schema).validate(good);
const _bad = new CheckValue<typeof schema>().object(schema).validate(bad);
// const _bad = new CheckValue<typeof good>().object(schema).validate(bad);
const _badSingle = new CheckValue()
  .object({ name: CheckValue.string() })
  .validate({ name: null }, true);

describe("String Schema", () => {
  describe("Result single string", () => {
    it("must be string", () => {
      expect(_badSingle).toStrictEqual("name: must be string");
    });
  });
  describe("Good Value", () => {
    it("is alpha", () => {
      expect(_good.alpha).toStrictEqual("");
    });
    it("is alphaNum", () => {
      expect(_good.alphaNum).toStrictEqual("");
    });
    it("is numeric", () => {
      expect(_good.numeric).toStrictEqual("");
    });
    it("is email", () => {
      expect(_good.email).toStrictEqual("");
    });
    it("is url", () => {
      expect(_good.url).toStrictEqual("");
    });
    it("is uuid", () => {
      expect(_good.uuid).toStrictEqual("");
    });
    it("is required", () => {
      expect(_good.required).toStrictEqual("");
    });
    it("max", () => {
      expect(_good.max).toStrictEqual("");
    });
    it("min", () => {
      expect(_good.min).toStrictEqual("");
    });
  });
  describe("Bad Value", () => {
    it("alpha must only contain alpha characters", () => {
      expect(_bad.alpha).toStrictEqual(
        "alpha must only contain alpha characters"
      );
    });
    it("alphaNum must only contain alpha-numeric characters", () => {
      expect(_bad.alphaNum).toStrictEqual(
        "alphaNum must only contain alpha-numeric characters"
      );
    });
    it("numeric must only contain numeric characters", () => {
      expect(_bad.numeric).toStrictEqual(
        "numeric must only contain numeric characters"
      );
    });
    it("email must be a valid email", () => {
      expect(_bad.email).toStrictEqual("email must be a valid email");
    });
    it("url must be a valid url", () => {
      expect(_bad.url).toStrictEqual("url must be a valid url");
    });
    it("uuid must be a valid UUID", () => {
      expect(_bad.uuid).toStrictEqual("uuid must be a valid UUID");
    });
    it("required is required", () => {
      expect(_bad.required).toStrictEqual("required is required");
    });
    it("max must be at most 5 characters", () => {
      expect(_bad.max).toStrictEqual("max must be at most 5 characters");
    });
    it("min must be at least 5 characters", () => {
      expect(_bad.min).toStrictEqual("min must be at least 5 characters");
    });
  });
});
