import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "../Routs/Home";
import Tv from "../Routs/Tv";
import Search from "../Routs/Search";

export default () => (
  <Router>
    <>
      <Route path="/" exact component={Home} />
      <Route path="/tv" exact component={Tv} />
      <Route path="/search" exact component={Search} />
    </>
  </Router>
);
