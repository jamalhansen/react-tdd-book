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
