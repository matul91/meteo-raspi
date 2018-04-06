import axios from "axios";
import * as actionTypes from "./actionTypes";

export const weatherLoadStart = () => {
    return {
        type: actionTypes.WEATHER_LOAD_START,
    };
};

export const weatherLoadSuccess = (charts) => {
    return {
        charts,
        type: actionTypes.AUTH_SUCCESS,
    };
};

export const weatherLoadFail = (error) => {
    return {
        error,
        type: actionTypes.WEATHER_LOAD_FAIL,
    };
};

export const weatherLoad = () => {
    return (dispatch) => {
        dispatch(weatherLoadStart());
    };
};
