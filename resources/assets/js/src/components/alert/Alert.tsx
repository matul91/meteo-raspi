import * as React from "react";
import {Alert as RBAlert} from "react-bootstrap";
import * as Errors from "../../config/constants/errors";

const Alert = (props) => {
    let text = "";

    switch (props.type) {
        case Errors.INVALID_CREDENTIALS:
            text = "Invalid credentials.";
            break;
        case Errors.NO_DATA:
            text = "There are no data for this date input.";
            break;
        default:
            text = "Unknown error.";
    }

    return (
        <RBAlert bsStyle={props.cls}>
            {text}
        </RBAlert>
    );
};

export default Alert;
