import * as React from "react";
import {NavLink} from "react-router-dom";

const Navbar = () => {
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
                        <ul className="nav navbar-nav">
                            <li><a href="#">Link</a></li>
                        </ul>
                        <ul className="nav navbar-nav navbar-right">
                            <li><NavLink to="/login" >Přihlásit se</NavLink></li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
};

export default Navbar;
