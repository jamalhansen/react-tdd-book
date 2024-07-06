import { toBeInputFieldOfType } from "./toBeInputFieldOfType";
import { stripTerminalColor } from "./reactMatcherTestExtensions";

describe("toBeInputFieldOfType matcher", () => {
  it("returns pass is true when type matches that of given DOM element", () => {
    const domElement = {
      type: "testType",
    };
    const result = toBeInputFieldOfType(domElement, "testType");
    expect(result.pass).toBe(true);
  });

  it("returns pass is false when type does not match the given DOM element", () => {
    const domElement = {
      type: "testType",
    };
    const result = toBeInputFieldOfType(domElement, "notTestType");
    expect(result.pass).toBe(false);
  });

  it("returns a message that contains the source line if not match", () => {
    const domElement = { textContent: "" };
    const result = toBeInputFieldOfType(domElement, "testType");
    expect(stripTerminalColor(result.message())).toContain(
      `expect(element).toBeInputFieldOfType("testType")`
    );
  });

  it("returns a message that contains the source line if negated match", () => {
    const domElement = {
      type: "testType",
    };
    const result = toBeInputFieldOfType(domElement, "testType");
    expect(stripTerminalColor(result.message())).toContain(
      `expect(element).not.toBeInputFieldOfType("testType")`
    );
  });

  it("returns a message that contains the actual type", () => {
    const domElement = {
      type: "testType",
    };
    const result = toBeInputFieldOfType(domElement, "testType");
    expect(stripTerminalColor(result.message())).toContain(
      `Actual type: "testType"`
    );
  });
});
