import * as actionTypes from "../actions/actionTypes";

const initialState = {
    dataSets: {
        pressure: {
            columnName: "pressure",
            data: null,
            dataMeta: {
                firstDate: null,
                lastDate: null,
            },
            initialDate: null,
            initialValue: null,
            name: "Pressure",
            suffix: "hPa",
            url: "pressures",
        },
        temperature: {
            columnName: "temperature",
            data: null,
            dataMeta: {
                firstDate: null,
                lastDate: null,
            },
            initialDate: null,
            initialValue: null,
            name: "Temperature",
            suffix: "°C",
            url: "temperatures",
        },
        wind: {
            columnName: "speed",
            data: null,
            dataMeta: {
                firstDate: null,
                lastDate: null,
            },
            initialDate: null,
            initialValue: null,
            name: "Wind speed",
            suffix: "m/s",
            url: "winds",
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

const dataSetLoadSuccess = (state, action) => {
    return {
        ...state,
        dataSets: {
            ...state.dataSets,
            [action.setName]: action.dataSet,
        },
        loading: false,
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.WEATHER_LOAD_START: return weatherLoadStart(state, action);
        case actionTypes.WEATHER_LOAD_SUCCESS: return weatherLoadSuccess(state, action);
        case actionTypes.WEATHER_LOAD_FAIL: return weatherLoadFail(state, action);
        case actionTypes.DATASET_LOAD_SUCCESS: return dataSetLoadSuccess(state, action);
        default: return state;
    }
};

export default reducer;
