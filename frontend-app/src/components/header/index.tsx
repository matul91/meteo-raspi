import React from 'react';

export default class Header extends React.PureComponent<{}, {}> {
    render() {
        return (
            <header className="header layout__header container">
                <div className="header__title">RC Letiste Lubno</div>
                <div className="header__time">at 12:34</div>
            </header>
        );
    }
}
