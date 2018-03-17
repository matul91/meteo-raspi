import * as React from "react";
import {Button, ButtonGroup} from "react-bootstrap";
import * as Directions from "../../../config/constants/directions";

const ButtonPanel = (props) => {
    return (
        <div className="text-right chart-buttons">
            <ButtonGroup>
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
            </ButtonGroup>
        </div>
    );
};

export default ButtonPanel;
