import * as faker from "faker";
import { of } from "../src";

describe("Present Optionable", () => {
  const str = faker.lorem.words();
  const option = of(str);

  it("should return the correct value with get", () => {
    expect(option.get()).toBe(str);
  });

  it("should not return default value with getOrDefault", () => {
    expect(option.getOrDefault("toto")).toBe(str);
  });

  it("should not throw with getOrThrow", () => {
    expect(() => option.getOrThrow(TypeError)).not.toThrow();
  });

  it("should not called function with getOrElse", () => {
    const mock = jest.fn().mockReturnValue("toto");
    const result = option.getOrElse(mock);
    expect(mock).not.toHaveBeenCalled();
    expect(result).toBe(str);
  });

  it("should return correct value with map", () => {
    const upper = str.toUpperCase();
    expect(option.map(s => s.toUpperCase())).toBe(upper);
  });
});
