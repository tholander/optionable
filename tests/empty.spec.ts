import * as faker from "faker";
import { empty, NoElementError } from "../src";

describe("Empty Optionable", () => {
  const option = empty<string>();

  it("should throw NoElementError when getting value", () => {
    expect(() => option.get()).toThrow(new NoElementError());
  });

  it("should return default value with getOrDefault", () => {
    const str = faker.lorem.word();
    expect(option.getOrDefault(str)).toBe(str);
  });

  it("should throw with getOrThrow and type as argument", () => {
    expect(() => option.getOrThrow(TypeError)).toThrow(new TypeError());
  });

  it("should throw with getOrThrow and error as argument", () => {
    expect(() => option.getOrThrow(new TypeError())).toThrow(new TypeError());
  });

  it("should call function with getOrElse", () => {
    const str = faker.lorem.words();
    const factory = (): string => str;
    expect(option.getOrElse(factory)).toBe(str);
  });

  it("should throw NoElementError with map", () => {
    expect(() => option.map(str => str.toUpperCase())).toThrow(new NoElementError());
  });
});
