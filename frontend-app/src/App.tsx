import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';

import { apolloClient } from './services/apollo';

import Layout from './components/layout'

export default class App extends React.PureComponent<{}, {}> {

    render() {
        return (
            <ApolloProvider client={apolloClient}>
                <Layout />
            </ApolloProvider>
        );
    }
}
