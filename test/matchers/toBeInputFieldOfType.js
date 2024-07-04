import { matcherHint, printExpected, printReceived } from "jest-matcher-utils";

export const toBeInputFieldOfType = (received, expectedType) => {
  const pass = received.type === expectedType;
  const sourceHint = () =>
    matcherHint(
      "toBeInputFieldOfType",
      "element",
      printExpected(expectedType),
      {
        isNot: pass,
      }
    );
  const actualClassHint = () => `Actual type: ${printReceived(received.type)}`;
  const message = () => [sourceHint(), actualClassHint()].join("\n\n");
  return { pass, message };
};
