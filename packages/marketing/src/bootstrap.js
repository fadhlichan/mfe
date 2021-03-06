import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";
import App from "./App";

export const mount = (element, { defaultHistory, initialPath, onNavigate }) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    });

  if (onNavigate) history.listen(onNavigate);

  ReactDOM.render(<App history={history} />, element);

  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname: currentPathname } = history.location;
      if (currentPathname === nextPathname) return;

      history.push(nextPathname);
    },
  };
};

if (process.env.NODE_ENV === "development") {
  const root = document.getElementById("_marketing-dev-root");
  if (root) mount(root, { defaultHistory: createBrowserHistory() });
}
