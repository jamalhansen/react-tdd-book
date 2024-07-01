import { matcherHint, printExpected, printReceived } from "jest-matcher-utils";

export const toHaveClass = (received, expectedClassName) => {
  const pass = received.className === expectedClassName;
  const sourceHint = () =>
    matcherHint("toHaveClass", "element", printExpected(expectedClassName), {
      isNot: pass,
    });
  const actualClassHint = () =>
    `Actual class: ${printReceived(received.className)}`;
  const message = () => [sourceHint(), actualClassHint()].join("\n\n");
  return { pass, message };
};
