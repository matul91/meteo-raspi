import * as React from "react";
import {Alert as RBAlert} from "react-bootstrap";

const Alert = (props) => {
    let text = "";

    switch (props.type) {
        case "invalid_credentials":
            text = "Invalid credentials.";
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
