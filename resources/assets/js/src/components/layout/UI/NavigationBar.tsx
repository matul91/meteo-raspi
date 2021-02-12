import HeaderClock from "components/clock/HeaderClock";
import * as React from "react";
import { Link } from "react-router-dom";
import { Col, Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";
import Voltage from "../../voltage/Voltage";

export default class NavigationBar extends React.Component {

    public render(): JSX.Element {
        return (
            <Navbar color="light" light={true} expand="md">
                <Col xs={6}>
                    <Link to="/" className="navbar-brand"><strong>METEO </strong> RasPi </Link>
                </Col>
                <Col xs={6} className={"text-right"}>
                    <HeaderClock/>
                    |
                    <Voltage/>
                </Col>
            </Navbar>
        );
    }
}
