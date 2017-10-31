import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Index from './pages/Index';
import PageNotFound from './pages/PageNotFound';

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact={true} component={Index} />
                <Route path='*' exact={true} component={PageNotFound} />
            </Switch>
        </BrowserRouter>
    );
}

if (document.getElementById('app')) {
    ReactDOM.render(
        <App/>, document.getElementById('app'));
}