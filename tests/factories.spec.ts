import { of, ofNullable, empty } from "../src";

describe("Factories", () => {
  describe("ofNullable", () => {
    it("should be empty with null value", () => {
      const option = ofNullable(null);
      expect(option.isPresent).toBeFalsy();
    });

    it("should be empty with undefined", () => {
      const option = ofNullable(undefined);
      expect(option.isPresent).toBeFalsy();
    });

    it("should not be empty with other", () => {
      const value = "toto";
      const option = ofNullable(value);
      expect(option.isPresent).toBeTruthy();
    });
  });

  describe("of", () => {
    it("should throw Error with null value", () => {
      expect(() => of(null)).toThrow(new Error("value is null"));
    });

    it("should throw Error with undefined value", () => {
      expect(() => of(undefined)).toThrow(new Error("value is null"));
    });

    it("should be ok with truthy value", () => {
      const option = of("toto");
      expect(option.isPresent).toBeTruthy();
    });
  });

  describe("empty", () => {
    it("should be empty", () => {
      const option = empty();
      expect(option.isPresent).toBeFalsy();
    });
  });
});
