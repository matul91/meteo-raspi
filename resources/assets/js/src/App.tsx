import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Layout from './components/layout/Layout';

const App = () => {
    return (
        <Layout />
    );
};

if (document.getElementById('app')) {
    ReactDOM.render(<App/>, document.getElementById('app'));
}
