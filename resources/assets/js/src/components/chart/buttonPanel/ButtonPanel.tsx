import * as React from "react";

const ButtonPanel = (props) => {
    return (
        <div className="text-right chart-buttons">
            <button
                name="minus"
                className="btn btn-default btn-space"
                onClick={props.clickHandler}
            >
                Předchozí
            </button>
            <button
                name="plus"
                className="btn btn-default"
                onClick={props.clickHandler}
            >
                Další
            </button>
        </div>
    );
};

export default ButtonPanel;
