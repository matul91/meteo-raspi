import * as React from "react";
import { ApolloProvider } from "react-apollo";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import apolloClient from "services/apollo";
import weatherReducer from "store/reducers/weather";
import Layout from "./components/layout/Layout";

const rootReducer = combineReducers({
    weather: weatherReducer,
});

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
    ),
);

const app = (
    <ApolloProvider client={apolloClient}>
        <Provider store={store}>
           <Layout />
        </Provider>
    </ApolloProvider>
);

ReactDOM.render(app, document.getElementById("weather-app"));
