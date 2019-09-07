import HeaderClock from "components/clock/HeaderClock";
import * as React from "react";
import { Link } from "react-router-dom";
import { Col, Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from "reactstrap";

interface IState {
    isOpen: boolean;
}

interface IProps {
    isAuthenticated: boolean;
    user: any;
}

class UINavbar extends React.Component<IProps, IState> {
    public state = {
        isOpen: false,
    };

    public render(): JSX.Element {
        return (
            <Navbar color="light" light={true} expand="md">
                <Col xs={6}>
                    <Link to="/" className="navbar-brand"><strong>METEO </strong> RasPi - Lubno </Link>
                </Col>
                <Col xs={6} className={"text-right"}>
                    <HeaderClock/>
                </Col>
            </Navbar>
        );
    }

    private toggleNav = (): void => {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }
}

export default UINavbar;
