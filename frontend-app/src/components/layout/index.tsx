import React from 'react';

import Header from '../header';
import Locality from '../locality';
import Conditions from '../conditions';
import Gallery from '../gallery';
import Overview from '../overview';
import Footer from '../footer';
import Main from '../main';

// import arrowIcon from './arrow.svg';

export default class Layout extends React.PureComponent<{}, {}> {

    render() {
        return (
            <div className="layout">
                <Header />
                <Locality />
                <Main />

                <Conditions />
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
