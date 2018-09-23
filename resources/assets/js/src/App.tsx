import App from "components/app/App";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import apolloClient from "services/apollo";
import { registerServiceWorker } from "services/fcm/registerServiceWorker";
import authReducer from "store/reducers/auth";
import weatherReducer from "store/reducers/weather";

registerServiceWorker();

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: authReducer,
    weather: weatherReducer,
});

const store = createStore(
    rootReducer,
    composeEnhancers(
        applyMiddleware(thunk),
    ),
);

const app = (
    <ApolloProvider client={apolloClient}>
        <Provider store={store}>
            <App />
        </Provider>
    </ApolloProvider>
);

if (document.getElementById("weather-app")) {
    ReactDOM.render(app, document.getElementById("weather-app"));
}
