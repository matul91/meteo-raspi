import * as React from "react";
import {Button} from "react-bootstrap";

const ButtonPanel = (props) => {
    return (
        <div className="text-right chart-buttons">
            <Button
                name="minus"
                onClick={props.clickHandler}
            >
                Předchozí
            </Button>
            <Button
                name="plus"
                onClick={props.clickHandler}
            >
                Další
            </Button>
        </div>
    );
};

export default ButtonPanel;
