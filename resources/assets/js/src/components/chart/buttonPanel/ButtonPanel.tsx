import * as React from "react";
import {Button} from "react-bootstrap";
import * as Directions from "../../../config/constants/directions";

const ButtonPanel = (props) => {
    return (
        <div className="text-right chart-buttons">
            <Button
                name={Directions.MINUS}
                onClick={props.clickHandler}
            >
                Předchozí
            </Button>
            <Button
                name={Directions.PLUS}
                onClick={props.clickHandler}
                disabled={props.initialDate === props.lastDate}
            >
                Další
            </Button>
        </div>
    );
};

export default ButtonPanel;
