import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import Layout from "./components/layout/Layout";
import authReducer from "./store/reducers/auth";

const App = () => {
    return (
        <Layout />
    );
};

const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
    auth: authReducer,
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

if (document.getElementById("app")) {
    ReactDOM.render(app, document.getElementById("app"));
}
