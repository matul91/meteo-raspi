import axios from "axios";
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
    localStorage.removeItem("token");
    localStorage.removeItem("expirationDate");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
    return {
        type: actionTypes.AUTH_LOGOUT,
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return (dispatch) => {
        setTimeout(() => {
            dispatch(logout());
        }, expirationTime * 1000);
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
                const expirationDate = new Date(new Date().getTime() + response.data.expires_in * 1000);
                const headerData = {
                    Authorization: `Bearer ${accessToken}`,
                };
                axios.get(process.env.MIX_USER_PROFILE_ADD, {headers: headerData}).then((res) => {
                    localStorage.setItem("token", accessToken);
                    localStorage.setItem("expirationDate", expirationDate.toString());
                    localStorage.setItem("userId", res.data.id);
                    localStorage.setItem("name", res.data.name);
                    dispatch(authSuccess(accessToken, res.data.id, res.data.name));
                    dispatch(checkAuthTimeout(response.data.expires_in));
                }).catch((err) => {
                    dispatch(authFail(err.response.data.error));
                });
            })
            .catch((err) => {
                dispatch(authFail(err.response.data.error));
            });
    };
};

export const authCheckState = () => {
    return (dispatch) => {
        const token = localStorage.getItem("token");
        if (!token) {
            dispatch(logout());
            return;
        }

        const expirationDate = new Date(localStorage.getItem("expirationDate"));
        if (expirationDate <= new Date()) {
            dispatch(logout());
            return;
        }

        const userId = localStorage.getItem("userId");
        const name = localStorage.getItem("name");
        dispatch(authSuccess(token, userId, name));
        dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
    };
};
