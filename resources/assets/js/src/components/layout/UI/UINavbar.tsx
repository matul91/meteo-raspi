import * as React from "react";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {Link} from "react-router-dom";

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
        const userLinks = this.getUserLinks();
        const userInfo = this.getUserInfo();

        return (
            <Navbar fluid={true}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">Letiště Baška - LKBASK</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    {this.props.isAuthenticated && userLinks}
                    {userInfo}
                </Navbar.Collapse>
            </Navbar>
        );
    }

    private getUserLinks(): JSX.Element {
        return (
            <Nav>
                <LinkContainer to="/logged">
                    <NavItem eventKey={1}>Uživatelská stránka</NavItem>
                </LinkContainer>
            </Nav>
        );
    }

    private getUserInfo(): JSX.Element {
        let userInfo = (
            <Nav pullRight={true}>
                <LinkContainer to="/login">
                    <NavItem eventKey={2}>Přihlásit se</NavItem>
                </LinkContainer>
            </Nav>
        );
        if (this.props.isAuthenticated) {
            userInfo = (
                <Navbar.Text pullRight={true}>
                    Přihlášen jako: {this.props.user} <Link to="/logout" >Odhlásit se</Link>
                </Navbar.Text>
            );
        }

        return userInfo;
    }
}

export default UINavbar;
