import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

export const mount = (element) => {
  ReactDOM.render(<App />, element);
};

if (process.env.NODE_ENV === "development") {
  const root = document.getElementById("_marketing-dev-root");
  if (root) mount(root);
}
