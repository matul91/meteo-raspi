import * as actionTypes from "store/actions/actionTypes";

export const weatherAppLoaded = () => {
    return {
        type: actionTypes.WEATHER_APP_STARTED,
    };
};
