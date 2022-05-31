import React from "react";
import ReactDOM from "react-dom";
import { createMemoryHistory, createBrowserHistory } from "history";
import App from "./App";

export const mount = (
  element,
  { defaultHistory, initialPath, onNavigate, onSignIn }
) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    });

  if (onNavigate) history.listen(onNavigate);

  ReactDOM.render(<App history={history} onSignIn={onSignIn} />, element);

  return {
    onParentNavigate({ pathname: nextPathname }) {
      const { pathname: currentPathname } = history.location;
      if (currentPathname === nextPathname) return;

      history.push(nextPathname);
    },
  };
};

if (process.env.NODE_ENV === "development") {
  const root = document.getElementById("_auth-dev-root");
  if (root) mount(root, { defaultHistory: createBrowserHistory() });
}
