import * as React from "react";
import {NavLink} from "react-router-dom";

const Navbar: any = (props) => {
        const loggedUserLinks = (
            <ul className="nav navbar-nav">
                <li><NavLink to="/logged" >Uživatelská stránka</NavLink></li>
            </ul>
        );

        const userInfo = (
            <p className="navbar-text navbar-right">Přihlášen jako {props.user}</p>
        );

        return (
            <nav className="navbar navbar-default">
                <div className="container">
                    <div className="navbar-header">
                        <button
                            type="button"
                            className="navbar-toggle collapsed"
                            data-toggle="collapse"
                            data-target="#bs-example-navbar-collapse-1"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                            <span className="icon-bar" />
                        </button>
                        <NavLink to="/" className="navbar-brand" >Letiště Baška</NavLink>
                    </div>
                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
                        {props.isAuthenticated && loggedUserLinks}
                        <ul className="nav navbar-nav navbar-right">
                            <li>
                                {!props.isAuthenticated && <NavLink to="/login" >Přihlásit se</NavLink>}
                                {props.isAuthenticated && <NavLink to="/logout" >Odhlásit se</NavLink>}
                            </li>
                        </ul>
                        {props.isAuthenticated && userInfo}
                    </div>
                </div>
            </nav>
        );
};

export default Navbar;
