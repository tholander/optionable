import { faker } from "@faker-js/faker";
import { empty, NoElementError, of } from "../src";

describe("Empty Optionable", () => {
  const option = empty<string>();

  it("should throw NoElementError when getting value", () => {
    expect(() => option.get()).toThrow(new NoElementError());
  });

  it("should return default value with getOrDefault", () => {
    const str = faker.lorem.word();
    expect(option.orElse(str)).toBe(str);
  });

  it("should throw with getOrThrow and no argument", () => {
    expect(() => option.orThrow()).toThrow(new NoElementError());
  });

  it("should throw with getOrThrow and type as argument", () => {
    expect(() => option.orThrow(TypeError)).toThrow(new TypeError());
  });

  it("should throw with getOrThrowError and error as argument", () => {
    expect(() => option.orThrow(new TypeError())).toThrow(new TypeError());
  });

  it("should return function result with getOrElse", () => {
    const str = faker.lorem.words();
    const factory = (): string => str;
    expect(option.orElse(factory)).toBe(str);
  });

  it("should return function result with getOrElse", () => {
    const str = faker.lorem.words();
    const mock = jest.fn().mockReturnValue(str);
    option.orElse(mock);
    expect(mock).toHaveBeenCalled();
  });

  it("should return empty with map", () => {
    expect(option.map(str => str.toUpperCase()).isPresent).toBeFalsy();
  });

  it("should return empty with truthy filter", () => {
    expect(option.filter(() => true).isPresent).toBeFalsy();
  });

  it("should return empty with falsy filter", () => {
    expect(option.filter(() => false).isPresent).toBeFalsy();
  });

  it("should return empty with empty flatMap", () => {
    const mock = jest.fn().mockReturnValue(empty());
    expect(option.flatMap(mock).isPresent).toBeFalsy();
  });

  it("should return empty with non-empty flatMap", () => {
    const mock = jest.fn().mockReturnValue(of(1));
    expect(option.flatMap(mock).isPresent).toBeFalsy();
  });

  it("should not execute callback", () => {
    const mock = jest.fn();
    option.ifPresent(mock);
    expect(mock).not.toHaveBeenCalled();
  });

  it("should return second value with or", () => {
    const str = "or";
    expect(option.or(() => str).get()).toBe(str);
  });

  it("should call runnable with ifPresent", () => {
    const mock = jest.fn();
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    option.ifPresentOrElse(() => {}, mock);
    expect(mock).toHaveBeenCalled();
  });

  it("should return correct string with toString", () => {
    expect(option.toString()).toBe("Empty()");
  });
});
