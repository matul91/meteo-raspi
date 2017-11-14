import * as actionTypes from "./actionTypes";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const authSuccess = (token, userId) => {
    return {
        idToken: token,
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
        dispatch(authSuccess("tokeeen", "userIdddd"));
    };
};
