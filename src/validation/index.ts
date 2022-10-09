export interface IResult {
  message?: string;
  result: boolean;
}

export default class Validation {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static required(str: any): IResult {
    if (!str) {
      return { result: true, message: "is required" };
    }
    return { result: false, message: "" };
  }
}
