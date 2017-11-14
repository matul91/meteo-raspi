import * as React from "react";
import {connect} from "react-redux";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import AccessDenied from "../pages/AccessDenied";
import Index from "../pages/Index";
import LoggedUser from "../pages/LoggedUser";
import Login from "../pages/Login";
import PageNotFound from "../pages/PageNotFound";
import Navbar from "./UI/Navbar";

const Layout = (props) => {
    let loggedRoutes = (
        <Route path="/logged" component={AccessDenied} />
    );

    if (props.isAuthenticated) {
        loggedRoutes = (
            <Route path="/logged" component={LoggedUser} />
        );
    }

    return (
        <BrowserRouter>
            <div id="main">
                <Navbar isAuthenticated={props.isAuthenticated} />
                <div className="container">
                    <Switch>
                        <Route path="/login" component={Login} />
                        {loggedRoutes}
                        <Route path="/" exact={true} component={Index} />
                        <Route component={PageNotFound} />
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
    };
};

export default connect(mapStateToProps)(Layout);
