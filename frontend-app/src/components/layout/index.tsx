import React from 'react';

import gql from "graphql-tag";
// import { ChildProps, graphql } from "react-apollo";
// nebo https://www.apollographql.com/docs/react/development-testing/static-typing/
import { useQuery } from '@apollo/react-hooks';

import Header from '../header';
import Conditions from '../conditions';
import Gallery from '../gallery';
import Overview from '../overview';
import Footer from '../footer';

interface TemperatureRecord {
    temperature: number;
    date: string;
}

interface Xxx {
    rocketInventory: TemperatureRecord[];
  }

const LATEST_WEATHER_RECORD_QUERY = gql`
    {
        latestTemperatures {
            temperature
            date
        }
    }
`;

export default function Layout() {
    const { loading, data } = useQuery<Xxx>(
        LATEST_WEATHER_RECORD_QUERY,
        {
            pollInterval: 5000
        }
    );

    console.log(data);

    return (
        <div className="layout">
            <Header />
            <Conditions />
            <div className="layout__gallery">
                <h1 className="h1 container">Last captures</h1>
                <Gallery />
            </div>
            <Overview />
            <Footer />
        </div>
    );
}
