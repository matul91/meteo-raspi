import * as Errors from "config/constants/errors";
import * as React from "react";
import { Alert as RBAlert } from "react-bootstrap";

const Alert = (props) => {
    let text = "";

    switch (props.type) {
        case Errors.INVALID_CREDENTIALS:
            text = "Invalid credentials.";
            break;
        case Errors.NO_DATA:
            text = "There are no data for this date input.";
            break;
        case Errors.NO_ALL_CREDENTIALS_FILLED:
            text = "One or more fields were not filled. Please fill all fields and try again.";
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
