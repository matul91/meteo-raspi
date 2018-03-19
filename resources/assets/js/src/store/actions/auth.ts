import axios from "axios";
import * as localStorageKeys from "../../config/constants/localStorage";
import * as actionTypes from "./actionTypes";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const authSuccess = (token, userId, name) => {
    return {
        idToken: token,
        name,
        type: actionTypes.AUTH_SUCCESS,
        userId,
    };
};

export const authFail = (error) => {
    return {
        error,
        type: actionTypes.AUTH_FAIL,
    };
};

export const logout = () => {
    localStorage.removeItem(localStorageKeys.TOKEN);
    localStorage.removeItem(localStorageKeys.EXPIRATION_DATE);
    localStorage.removeItem(localStorageKeys.USER_ID);
    localStorage.removeItem(localStorageKeys.NAME);
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime);
    };
};

export const auth = (email, password) => {
    return (dispatch) => {
        dispatch(authStart());
        const data = {
            client_id: process.env.MIX_CLIENT_ID,
            client_secret: process.env.MIX_CLIENT_SECRET,
            grant_type: process.env.MIX_GRANT_TYPE,
            password,
            username: email,
        };
        axios.post(process.env.MIX_OAUTH_ADD, data)
            .then((response) => {
                const accessToken = response.data.access_token;
                const expiresIn = response.data.expires_in;
                const headerData = { Authorization: `Bearer ${accessToken}` };
                dispatch(authGetUserInfo(headerData, accessToken, expiresIn));
            })
            .catch((err) => {
                dispatch(authFail(err.response.data.error));
            });
    };
};

export const authGetUserInfo = (headerData, accessToken, expiresIn) => {
    return (dispatch) => {
        const expirationDate = new Date(new Date().getTime() + expiresIn);
        axios.get(process.env.MIX_USER_PROFILE_ADD, {headers: headerData}).then((res) => {
            localStorage.setItem(localStorageKeys.TOKEN, accessToken);
            localStorage.setItem(localStorageKeys.EXPIRATION_DATE, expirationDate.toString());
            localStorage.setItem(localStorageKeys.USER_ID, res.data.id);
            localStorage.setItem(localStorageKeys.NAME, res.data.name);
            dispatch(authSuccess(accessToken, res.data.id, res.data.name));
            dispatch(checkAuthTimeout(expiresIn));
        }).catch((err) => {
            dispatch(authFail(err.response.data.error));
        });
    };
};

export const authCheckState = () => {
    return (dispatch) => {
        const token = localStorage.getItem(localStorageKeys.TOKEN);
        if (!token) {
            dispatch(logout());
            return;
        }

        const expirationDate = new Date(localStorage.getItem(localStorageKeys.EXPIRATION_DATE));
        if (expirationDate <= new Date()) {
            dispatch(logout());
            return;
        }

        const userId = localStorage.getItem(localStorageKeys.USER_ID);
        const name = localStorage.getItem(localStorageKeys.NAME);
        dispatch(authSuccess(token, userId, name));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())));
    };
};
