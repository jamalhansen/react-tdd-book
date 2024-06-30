import { matcherHint, printExpected, printReceived } from "jest-matcher-utils";

export const toContainText = (recieved, expectedText) => {
  const pass = recieved.textContent.includes(expectedText);
  const sourceHint = () =>
    matcherHint("toContainText", "element", printExpected(expectedText), {
      isNot: pass,
    });
  const actualTextHint = () =>
    "Actual text: " + printReceived(recieved.textContent);
  const message = () => [sourceHint(), actualTextHint()].join("\n\n");
  return { pass, message };
};
