import React from 'react';

import logo from '../../svg/logo.svg';

export default class Header extends React.PureComponent<{}, {}> {

    render() {
        return (
            <header className="header layout__header container">
                <div className="header__logo">
                    <img src={logo} alt="meteo raspi logo" />
                </div>
                <div className="header__name">
                    <b>meteo</b> raspi
                </div>
            </header>
        );
    }
}
