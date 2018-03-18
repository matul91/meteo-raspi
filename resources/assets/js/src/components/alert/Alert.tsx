import * as React from "react";
import {Alert as RBAlert} from "react-bootstrap";

const Alert = (props) => {
    let text = "";

    switch (props.type) {
        case "invalid_credentials":
            text = "Invalid credentials.";
            break;
        case "no_data":
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
