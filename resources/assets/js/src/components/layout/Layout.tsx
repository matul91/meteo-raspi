import Navbar from "components/layout/UI/UINavbar";
import PageLoading from "components/loading/PageLoading";
import * as React from "react";
import { Grid } from "react-bootstrap";
import * as Loadable from "react-loadable";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

const AccessDenied = Loadable({ loader: () => import("components/pages/AccessDenied"), loading: PageLoading });
const Index = Loadable({ loader: () => import("components/pages/Index"), loading: PageLoading });
const Login = Loadable({ loader: () => import("components/pages/Login"), loading: PageLoading });
const LoggedUser = Loadable({ loader: () => import("components/pages/LoggedUser"), loading: PageLoading });
const Logout = Loadable({ loader: () => import("components/pages/Logout"), loading: PageLoading });
const PageNotFound = Loadable({ loader: () => import("components/pages/PageNotFound"), loading: PageLoading });

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
                <Navbar isAuthenticated={props.isAuthenticated} user={props.user} />
                <Grid fluid={true}>
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/logout" component={Logout} />
                        {loggedRoutes}
                        <Route path="/" exact={true} component={Index} />
                        <Route component={PageNotFound} />
                    </Switch>
                </Grid>
            </div>
        </BrowserRouter>
    );
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
        user: state.auth.name,
    };
};

export default connect(mapStateToProps)(Layout);
