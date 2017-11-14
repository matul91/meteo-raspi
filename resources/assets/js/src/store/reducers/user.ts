import * as actionTypes from "../actions/actionTypes";

const initialState = {
    user: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_USER:
            return {
                ...state,
                user: action.payload,
            };
        default:
            return state;
    }
};

export default reducer;
