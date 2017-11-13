import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import Layout from './components/layout/Layout';
import userReducer from './store/reducers/user';

const App = () => {
    return (
        <Layout />
    );
};

const rootReducer = combineReducers({
    user: userReducer,
});

const store = createStore(
    rootReducer,
    (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
);

const app = (
    <Provider store={store}>
        <App />
    </Provider>
);

if (document.getElementById('app')) {
    ReactDOM.render(app, document.getElementById('app'));
}
