import React, { Suspense, useState, useEffect } from "react";
import { Router, Redirect, Switch, Route } from "react-router-dom";
import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";
import { createBrowserHistory } from "history";
import Header from "./components/Header";
import Progress from "./components/Progress";
const MarketingApp = React.lazy(() => import("./components/MarketingApp"));
const AuthApp = React.lazy(() => import("./components/AuthApp"));
const DashboardApp = React.lazy(() => import("./components/DashboardApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

const history = createBrowserHistory();

const App = () => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    if (isSignedIn) {
      history.push("/dashboard");
    }
  }, [isSignedIn]);

  return (
    <Router history={history}>
      <StylesProvider generateClassName={generateClassName}>
        <Header
          isSignedIn={isSignedIn}
          onSignOut={() => setIsSignedIn(false)}
        />
        <Suspense fallback={<Progress />}>
          <Switch>
            <Route path="/auth">
              <AuthApp onSignIn={() => setIsSignedIn(true)} />
            </Route>
            <Route path="/dashboard">
              {!isSignedIn && <Redirect to="/" />}
              <DashboardApp />
            </Route>
            <Route path="/" component={MarketingApp} />
          </Switch>
        </Suspense>
      </StylesProvider>
    </Router>
  );
};

export default App;
