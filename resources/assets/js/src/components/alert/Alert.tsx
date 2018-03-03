import * as React from "react";

const Alert: any = (props) => {
    let text = "";

    switch (props.type) {
        case "invalid_credentials":
            text = "Neplatné přilašovací údaje";
            break;
        default:
            text = "Neznámá chyba";
    }

    const cls = `alert alert-${props.cls}`;

    return (
        <div className={cls} role="alert">{text}</div>
    );
};

export default Alert;
