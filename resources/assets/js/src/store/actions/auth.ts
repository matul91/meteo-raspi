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
            client_id: 2,
            client_secret: "zLVQUdDRTPwmaXEouLlbTbX5knSFcPKrUNHTSDt7",
            grant_type: "password",
            password,
            username: email,
        };
        axios.post("/oauth/token", data)
            .then((response) => {
                const accessToken = response.data.access_token;
                const expirationDate = new Date(new Date().getTime() + response.data.expires_in * 1000);
                const headerData = {
                    Authorization: `Bearer ${accessToken}`,
                };
                axios.get("/api/user", {headers: headerData}).then((res) => {
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
        } else {
            const expirationDate = new Date(localStorage.getItem("expirationDate"));
            if (expirationDate <= new Date()) {
                dispatch(logout());
            } else {
                const userId = localStorage.getItem("userId");
                const name = localStorage.getItem("name");
                dispatch(authSuccess(token, userId, name));
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
};
