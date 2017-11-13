import * as React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Index from "../pages/Index";
import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import Navbar from "./UI/Navbar";

const Layout = () => {
  return (
      <BrowserRouter>
          <div id="main">
              <Navbar />
              <div className="container">
                  <Switch>
                      <Route path="/" exact={true} component={Index} />
                      <Route path="/login" exact={true} component={Login} />
                      <Route component={PageNotFound} />
                  </Switch>
              </div>
          </div>
      </BrowserRouter>
  );
};

export default Layout;
