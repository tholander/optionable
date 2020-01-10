import * as faker from "faker";
import { of, empty } from "../src";

describe("Present Optionable", () => {
  const str = faker.lorem.words();
  const option = of(str);

  it("should return the correct value with get", () => {
    expect(option.get()).toBe(str);
  });

  it("should not return default value with getOrDefault", () => {
    expect(option.orElse("toto")).toBe(str);
  });

  it("should not throw with getOrThrow", () => {
    expect(() => option.orThrow(TypeError)).not.toThrow();
  });

  it("should not throw with getOrThrow error", () => {
    expect(() => option.orThrow(new TypeError())).not.toThrow();
  });

  it("should not called function with getOrElse", () => {
    const mock = jest.fn().mockReturnValue("toto");
    const result = option.orElse(mock);
    expect(mock).not.toHaveBeenCalled();
    expect(result).toBe(str);
  });

  it("should return correct value with map", () => {
    const upper = str.toUpperCase();
    expect(option.map(s => s.toUpperCase()).get()).toBe(upper);
  });

  it("should return empty with falsy filter", () => {
    expect(option.filter(() => false).isPresent).toBeFalsy();
  });

  it("should return not empty with truthy filter", () => {
    expect(option.filter(() => true).isPresent).toBeTruthy();
  });

  it("should return empty with empty flatMap", () => {
    const mock = jest.fn().mockReturnValue(empty());
    expect(option.flatMap(mock).isPresent).toBeFalsy();
  });

  it("should return non-empty with non-empty flatMap", () => {
    const mock = jest.fn().mockReturnValue(of(1));
    expect(option.flatMap(mock).isPresent).toBeTruthy();
  });

  it("should execute callback", () => {
    const mock = jest.fn();
    option.ifPresent(mock);
    expect(mock).toHaveBeenCalled();
  });

  it("should execute callback with correct argument", () => {
    const mock = jest.fn();
    option.ifPresent(mock);
    expect(mock).toHaveBeenCalledWith(str);
  });
});
