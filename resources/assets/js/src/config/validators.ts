import * as validator from "validator";

export const required = (value) => {
    return (!value.toString().trim().length) ? "This value is required." : null;
};

export const email = (value) => {
    return (!validator.isEmail(value)) ? `${value} is not e-mail address.` : null;
};
