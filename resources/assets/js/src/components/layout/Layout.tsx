import Navbar from "components/layout/UI/UINavbar";
import PageLoading from "components/loading/PageLoading";
import * as React from "react";
import { Grid } from "react-bootstrap";
import * as Loadable from "react-loadable";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import Footer from "./Footer";

const AccessDenied = Loadable({ loader: () => import("components/pages/AccessDenied"), loading: PageLoading });
const Index = Loadable({ loader: () => import("components/pages/Index"), loading: PageLoading });
const Login = Loadable({ loader: () => import("components/pages/Login"), loading: PageLoading });
const LoggedUser = Loadable({ loader: () => import("components/pages/LoggedUser"), loading: PageLoading });
const Logout = Loadable({ loader: () => import("components/pages/Logout"), loading: PageLoading });
const PageNotFound = Loadable({ loader: () => import("components/pages/PageNotFound"), loading: PageLoading });

interface IProps {
   isAuthenticated: boolean;
   user: string;
}

class Layout extends React.Component<IProps, null> {
    public render(): JSX.Element {
        return (
            <BrowserRouter>
                <React.Fragment>
                    <header>
                        <Navbar isAuthenticated={this.props.isAuthenticated} user={this.props.user} />
                    </header>
                    <Grid id="separator" fluid={true} />
                    <Grid className="content flex-grow px-0" fluid={true}>
                        <Switch>
                            <Route path="/login" component={Login} />
                            <Route path="/logout" component={Logout} />
                            {this.getRoutes()}
                            <Route path="/" exact={true} component={Index} />
                            <Route component={PageNotFound} />
                        </Switch>
                    </Grid>
                    <Footer/>
                </React.Fragment>
            </BrowserRouter>
        );
    }
    private getRoutes(): JSX.Element {
        if (this.props.isAuthenticated) {
            return <Route path="/logged" component={LoggedUser}/>;
        }
        return <Route path="/logged" component={AccessDenied} />;
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.token !== null,
        user: state.auth.name,
    };
};

export default connect(mapStateToProps)(Layout);
