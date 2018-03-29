import * as React from "react";
import validator from "validator";

export const required = (value) => {
    if (!value.toString().trim().length) {
        return <span className="help-block error">This field is required.</span>;
    }
};

export const email = (value) => {
    if (!validator.isEmail(value)) {
        return <span className="help-block error">{value} is not a valid email.</span>;
    }
};
