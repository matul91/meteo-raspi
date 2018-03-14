import * as React from "react";
import {Alert as RBAlert} from "react-bootstrap";

const Alert = (props) => {
    let text = "";

    switch (props.type) {
        case "invalid_credentials":
            text = "Neplatné přilašovací údaje";
            break;
        default:
            text = "Neznámá chyba";
    }

    return (
        <RBAlert bsStyle={props.cls}>
            {text}
        </RBAlert>
    );
};

export default Alert;
