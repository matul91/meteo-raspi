import App from "components/app/App";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import authReducer from "store/reducers/auth";
import weatherReducer from "store/reducers/weather";

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("firebase-messaging-sw.js", {
            scope: "./",
        })
        .then((registration) => {
            console.log("SW registered:", registration);
        }).catch((registrationError) => {
            console.log("SW registration failed:", registrationError);
        });
    });
}

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
    <Provider store={store}>
        <App />
    </Provider>
);

if (document.getElementById("weather-app")) {
    ReactDOM.render(app, document.getElementById("weather-app"));
}
