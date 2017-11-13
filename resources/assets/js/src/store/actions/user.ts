import * as actionTypes from './actionTypes';

export const addUser = (user) => {
    return {
        payload: user,
        type: actionTypes.ADD_USER,
    };
};
