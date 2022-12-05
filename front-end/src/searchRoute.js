import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/search">
          <SearchResults />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};