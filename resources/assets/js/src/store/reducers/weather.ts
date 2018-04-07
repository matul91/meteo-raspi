import * as actionTypes from "../actions/actionTypes";

const initialState = {
    charts: {
        pressure: {
            columnName: "pressure",
            data: null,
            dataMeta: {
                firstDate: null,
                lastDate: null,
            },
            initialDate: null,
            initialValue: null,
            name: "Tlak",
            suffix: "hPa",
            url: "pressures",
        },
    },
    dbDateFormat: "YYYY-MM-DD HH:mm:ss",
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

const chartLoadSuccess = (state, action) => {
    return {
        ...state,
        charts: {
            ...state.charts,
            [action.chartName]: action.chart,
        },
        loading: false,
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.WEATHER_LOAD_START: return weatherLoadStart(state, action);
        case actionTypes.WEATHER_LOAD_SUCCESS: return weatherLoadSuccess(state, action);
        case actionTypes.WEATHER_LOAD_FAIL: return weatherLoadFail(state, action);
        case actionTypes.CHART_LOAD_SUCCESS: return chartLoadSuccess(state, action);
        default: return state;
    }
};

export default reducer;
