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
                const headerData = {
                    Authorization: `Bearer ${accessToken}`,
                };
                axios.get("/api/user", {headers: headerData}).then((res) => {
                    dispatch(authSuccess(accessToken, res.data.id, res.data.name));
                }).catch((err) => {
                    dispatch(authFail(err.response.data.error));
                });
            })
            .catch((err) => {
                dispatch(authFail(err.response.data.error));
            });
    };
};
