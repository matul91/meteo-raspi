import * as actionTypes from "../actions/actionTypes";

const initialState = {
    charts: {
        pressure: {
            columnName: "pressure",
            data: null,
            initialDate: null,
            initialValue: null,
            name: "Tlak",
            suffix: "hPa",
            url: "pressures",
        },
    },
    error: null,
    loading: false,
};

const weatherLoadStart = (state, action) => {
    return {
        ...state,
        error: null,
        loading: true,
    };
};

const weatherLoadSuccess = (state, action) => {
    return {
        ...state,
        charts: action.charts,
        error: null,
        loading: false,
    };
};

const weatherLoadFail = (state, action) => {
    return {
        ...state,
        error: action.error,
        loading: false,
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.WEATHER_LOAD_START: return weatherLoadStart(state, action);
        case actionTypes.WEATHER_LOAD_SUCCESS: return weatherLoadSuccess(state, action);
        case actionTypes.WEATHER_LOAD_FAIL: return weatherLoadFail(state, action);
        default: return state;
    }
};

export default reducer;
