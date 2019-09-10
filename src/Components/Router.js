import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Home from "../Routs/Home";
import TV from "../Routs/TV";
import Header from "./Header";
import Search from "../Routs/Search";
import Detail from "../Routs/Detail";
import Collections from "../Routs/Collections";

export default () => (
  <Router>
    <Header />
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/tv" exact component={TV} />
      <Route path="/search" exact component={Search} />
      <Route path="/movie/:id" exact component={Detail} />
      <Route path="/show/:id" component={Detail} />
      <Route path="/collections/:id" component={Collections} />>
      <Redirect from="*" to="/" />
    </Switch>
  </Router>
);
