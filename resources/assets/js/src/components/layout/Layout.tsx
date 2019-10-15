import * as React from "react";
import { Grid } from "react-bootstrap";
import { connect } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import Main from "../../pages/Main";
import PageNotFound from "../../pages/PageNotFound";
import Footer from "./Footer";
import NavigationBar from "./UI/NavigationBar";

export default class Layout extends React.PureComponent {
    public render(): JSX.Element {
        return (
            <BrowserRouter>
                <React.Fragment>
                    <header>
                        <NavigationBar />
                    </header>
                    <Grid id="separator" fluid={true} />
                    <Grid className="content flex-grow px-0" fluid={true}>
                        <Switch>
                            <Route path="/" exact={true} component={Main} />
                            <Route component={PageNotFound} />
                        </Switch>
                    </Grid>
                    <Footer/>
                </React.Fragment>
            </BrowserRouter>
        );
    }
}
