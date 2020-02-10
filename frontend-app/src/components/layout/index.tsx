import React from 'react';

import Header from '../header';
import Overview from '../overview';
import Footer from '../footer';
import Main from '../main';

export default class Layout extends React.PureComponent<{}, {}> {

    render() {
        return (
            <div className="layout">
                <Header />
                <Main />
                <Overview />
                <Footer />
            </div>
        );
    }
}
