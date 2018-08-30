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

    constructor(props) {
        super(props);
        this.toggleNav = this.toggleNav.bind(this);
    }

    public render(): JSX.Element {
        const userLinks = this.getUserLinks();
        const userInfo = this.getUserInfo();

        return (
            <Navbar color="light" light={true} expand="md">
                <Col xs={3}>
                    <Link to="/" className="navbar-brand"><strong>METEO </strong> RasPi - Lubno </Link>
                </Col>
                <Col xs={6} className={"text-center"}>
                    <HeaderClock/>
                </Col>
                <Col xs={3}>
                    <NavbarToggler onClick={this.toggleNav} />
                    <Collapse isOpen={this.state.isOpen} navbar={true}>
                        <Nav navbar={true}>
                            {this.props.isAuthenticated && userLinks}
                        </Nav>
                        <Nav className="ml-auto" navbar={true}>
                            {userInfo}
                        </Nav>
                    </Collapse>
                </Col>
            </Navbar>
        );
    }

    private getUserLinks(): JSX.Element {
        return (
            <NavItem>
                <Link to="/logged">Uživatelská stránka</Link>
            </NavItem>
        );
    }

    private getUserInfo(): JSX.Element {
        let userInfo = (
            <NavItem>
                <Link to="/login">Login</Link>
            </NavItem>
        );

        if (this.props.isAuthenticated) {
            userInfo = (
                <NavItem>
                    Přihlášen jako: {this.props.user}
                    <Link to="/logout">&nbsp; Odhlásit se</Link>
                </NavItem>
            );
        }

        return userInfo;
    }

    private toggleNav(): void {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }
}

export default UINavbar;
