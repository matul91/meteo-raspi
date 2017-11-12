import * as React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Index from '../pages/Index';
import PageNotFound from '../pages/PageNotFound';

const Layout = () => {
  return (
      <BrowserRouter>
          <Switch>
              <Route path='/' exact={true} component={Index} />
              <Route component={PageNotFound} />
          </Switch>
      </BrowserRouter>
  );
};

export default Layout;
