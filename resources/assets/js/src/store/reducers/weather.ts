import * as actionTypes from "store/actions/actionTypes";

const initialState = {
    loaded: false,
};

const weatherAppStarted = (state, action) => {
    return {
        ...state,
        loaded: true,
    };
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.WEATHER_APP_STARTED: return weatherAppStarted(state, action);
        default: return state;
    }
};

export default reducer;
