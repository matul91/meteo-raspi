import React from 'react';

import Header from '../header';
import Locality from '../locality';
import Gallery from '../gallery';
import Overview from '../overview';
import Footer from '../footer';
import Main from '../main';

export default class Layout extends React.PureComponent<{}, {}> {

    render() {
        return (
            <div className="layout">
                <Header />
                <Locality />
                <Main />
                <div className="layout__gallery">
                    <h2 className="h2 container">Posledni snimky</h2>
                    <Gallery />
                </div>
                <Overview />
                <Footer />
            </div>
        );
    }
}
