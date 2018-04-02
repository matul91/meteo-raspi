import validator from "validator";

export const required = (value) => {
    return !value.toString().trim().length;
};

export const email = (value) => {
    return !validator.isEmail(value);
};
