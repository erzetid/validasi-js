import CheckValue from '../src/app';

const good = {
  max: 659,
  min: 6,
  lessThan: 452,
  moreThan: 13,
  positive: 4,
  negative: -8,
  integer: 6,
};
const bad = {
  max: 1253,
  min: 3,
  lessThan: 569,
  moreThan: 9,
  positive: -4,
  negative: 8,
  integer: 6.5,
};
const schema = {
  max: CheckValue.number().max(1000),
  min: CheckValue.number().min(5),
  lessThan: CheckValue.number().lessThan(500),
  moreThan: CheckValue.number().moreThan(10),
  positive: CheckValue.number().positive(),
  negative: CheckValue.number().negative(),
  integer: CheckValue.number().integer(),
};

const _good = new CheckValue<typeof schema>().object(schema).validate(good);
const _bad = new CheckValue<typeof schema>().object(schema).validate(bad);
const _badSingle = new CheckValue()
  .object({ name: CheckValue.number() })
  .validate({ name: [] }, true);

describe("Number Schema", () => {
  describe("Result single string", () => {
    it("must be number", () => {
      expect(_badSingle).toStrictEqual("name: must be number");
    });
  });
  describe("Good Value", () => {
    it("is max", () => {
      expect(_good.max).toStrictEqual("");
    });
    it("is min", () => {
      expect(_good.min).toStrictEqual("");
    });
    it("is lessThan", () => {
      expect(_good.lessThan).toStrictEqual("");
    });
    it("is moreThan", () => {
      expect(_good.moreThan).toStrictEqual("");
    });
    it("is positive", () => {
      expect(_good.positive).toStrictEqual("");
    });
    it("is negative", () => {
      expect(_good.negative).toStrictEqual("");
    });
    it("is integer", () => {
      expect(_good.integer).toStrictEqual("");
    });
  });
  describe("Bad Value", () => {
    it("max must be less than or equal to 1000", () => {
      expect(_bad.max).toStrictEqual("max must be less than or equal to 1000");
    });
    it("min must be greater than or equal to 5", () => {
      expect(_bad.min).toStrictEqual("min must be greater than or equal to 5");
    });
    it("lessThan must be less than to 500", () => {
      expect(_bad.lessThan).toStrictEqual("lessThan must be less than to 500");
    });
    it("moreThan must be greater than to 10", () => {
      expect(_bad.moreThan).toStrictEqual(
        "moreThan must be greater than to 10"
      );
    });
    it("positive must be a positive number", () => {
      expect(_bad.positive).toStrictEqual("positive must be a positive number");
    });
    it("negative must be a negative number", () => {
      expect(_bad.negative).toStrictEqual("negative must be a negative number");
    });
    it("integer must be an integer", () => {
      expect(_bad.integer).toStrictEqual("integer must be an integer");
    });
  });
});
