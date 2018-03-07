import * as React from "react";
import * as Loadable from "react-loadable";
import {connect} from "react-redux";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Loading from "../loading/Loading";
import AccessDenied from "../pages/AccessDenied";
// import Index from "../pages/Index";
// import LoggedUser from "../pages/LoggedUser";
// import Login from "../pages/Login";
import Logout from "../pages/Logout";
import PageNotFound from "../pages/PageNotFound";
import Navbar from "./UI/Navbar";

const Index = Loadable({
    loader: () => import("../pages/Index"),
    loading: Loading,
});
const LoggedUser = Loadable({
    loader: () => import("../pages/LoggedUser"),
    loading: Loading,
});
const Login = Loadable({
    loader: () => import("../pages/Login"),
    loading: Loading,
});


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
                <div className="container-fluid">
                    <Switch>
                        <Route path="/login" component={Login} />
                        <Route path="/logout" component={Logout} />
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
        user: state.auth.name,
    };
};

export default connect(mapStateToProps)(Layout);
