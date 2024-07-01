import { toHaveClass } from "./toHaveClass";
import { stripTerminalColor } from "./reactMatcherTestExtensions";

describe("toHaveClass matcher", () => {
  it("returns pass is true when className matches that of given DOM element", () => {
    const domElement = {
      className: "testClassName",
    };
    const result = toHaveClass(domElement, "testClassName");
    expect(result.pass).toBe(true);
  });

  it("returns pass is false when class does not match the given DOM element", () => {
    const domElement = {
      className: "textClassName",
    };
    const result = toHaveClass(domElement, "testClassName");
    expect(result.pass).toBe(false);
  });

  it("returns a message that contains the source line if not match", () => {
    const domElement = { textContent: "" };
    const result = toHaveClass(domElement, "textClassName");
    expect(stripTerminalColor(result.message())).toContain(
      `expect(element).toHaveClass("textClassName")`
    );
  });

  it("returns a message that contains the source line if negated match", () => {
    const domElement = {
      className: "textClassName",
    };
    const result = toHaveClass(domElement, "textClassName");
    expect(stripTerminalColor(result.message())).toContain(
      `expect(element).not.toHaveClass("textClassName")`
    );
  });

  it("returns a message that contains the actual text", () => {
    const domElement = {
      className: "textClassName",
    };
    const result = toHaveClass(domElement, "textClassName");
    expect(stripTerminalColor(result.message())).toContain(
      `Actual class: "textClassName"`
    );
  });
});
