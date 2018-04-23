import * as actionTypes from "store/actions/actionTypes";

const initialState = {
    dataSets: {
        pressure: {
            columnName: "pressure",
            loading: false,
            name: "Pressure",
            suffix: "hPa",
            url: "pressures",
        },
        temperature: {
            columnName: "temperature",
            loading: false,
            name: "Temperature",
            suffix: "°C",
            url: "temperatures",
        },
        wind: {
            columnName: "speed",
            loading: false,
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

const dataSetLoadStart = (state, action) => {
    const originalDataSet = state.dataSets[action.setName];
    return {
        ...state,
        dataSets: {
            ...state.dataSets,
            [action.setName]: {
                ...originalDataSet,
                loading: true,
            },
        },
    };
};

const dataSetLoadSuccess = (state, action) => {
    return {
        ...state,
        dataSets: {
            ...state.dataSets,
            [action.setName]: {
                ...action.dataSet,
                loading: false,
            },
        },
    };
};

const dataSetLoadFail = (state, action) => {
    const originalDataSet = state.dataSets[action.setName];
    return {
        ...state,
        dataSets: {
            ...state.dataSets,
            [action.setName]: {
                ...originalDataSet,
                error: action.error,
                loading: false,
            },
        },
    };
};

const dataSetResetError = (state, action) => {
    const originalDataSet = state.dataSets[action.setName];
    return {
        ...state,
        dataSets: {
            ...state.dataSets,
            [action.setName]: {
                ...originalDataSet,
                error: null,
            },
        },
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.WEATHER_LOAD_START: return weatherLoadStart(state, action);
        case actionTypes.WEATHER_LOAD_SUCCESS: return weatherLoadSuccess(state, action);
        case actionTypes.WEATHER_LOAD_FAIL: return weatherLoadFail(state, action);
        case actionTypes.DATASET_LOAD_START: return dataSetLoadStart(state, action);
        case actionTypes.DATASET_LOAD_SUCCESS: return dataSetLoadSuccess(state, action);
        case actionTypes.DATASET_LOAD_FAIL: return dataSetLoadFail(state, action);
        case actionTypes.DATASET_RESET_ERROR: return dataSetResetError(state, action);
        default: return state;
    }
};

export default reducer;
