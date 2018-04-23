import * as actionTypes from "store/actions/actionTypes";

const initialState = {
    error: null,
    loading: false,
    name: null,
    token: null,
    userId: null,
};

const authStart = (state, action) => {
    return {
        ...state,
        error: null,
        loading: true,
    };
};

const authSuccess = (state, action) => {
    return {
        ...state,
        error: null,
        loading: false,
        name: action.name,
        token: action.idToken,
        userId: action.userId,
    };
};

const authFail = (state, action) => {
    return {
        ...state,
        error: action.error,
        loading: false,
    };
};

const authLogout = (state, action) => {
    return {
        ...state,
        error: null,
        loading: false,
        name: null,
        token: null,
        userId: null,
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START: return authStart(state, action);
        case actionTypes.AUTH_SUCCESS: return authSuccess(state, action);
        case actionTypes.AUTH_FAIL: return authFail(state, action);
        case actionTypes.AUTH_LOGOUT: return authLogout(state, action);
        default: return state;
    }
};

export default reducer;
