import { NoElementError } from "../src";

describe("NoElementError", () => {
  it("should have correct message", () => {
    const error = new NoElementError();
    expect(error.message).toBe("Element not present");
  });
});
