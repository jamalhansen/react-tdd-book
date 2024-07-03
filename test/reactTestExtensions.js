import React, { act } from "react";
import ReactDOM from "react-dom/client";

export let container;
export const initializeReactContainer = () => {
  container = document.createElement("div");
  document.body.replaceChildren(container);
};

export const render = (component) => {
  act(() => ReactDOM.createRoot(container).render(component));
};

export const click = (element) => act(() => element.click());

export const element = (selector) => document.querySelector(selector);

export const elements = (selector) =>
  Array.from(document.querySelectorAll(selector));

export const typeOf = (elements) => elements.map((element) => element.type);

export const textOf = (elements) => {
  return elements.map((element) => {
    return element.textContent;
  });
};

export const form = (id) => element("form");

export const field = (fieldName) => form().elements[fieldName];

export const label = (fieldName) => element(`label[for=${fieldName}]`);
