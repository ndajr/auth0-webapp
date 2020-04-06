import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./Login";
import LoginCallback from "./LoginCallback";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Switch>
        <Route path="/login/callback" component={LoginCallback} />
        <Route path="/login" component={Login} />
        <Redirect to="login" />
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
