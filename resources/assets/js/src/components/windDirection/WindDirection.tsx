import * as React from "react";

const WindDirection = (props) => {
    return (
        <div className="wind-direction">
            <img
                src={`/images/directions/${props.direction}.png`}
                alt={props.direction}
                className="img-responsive"
            />
            <p>{props.speed} {props.suffix}</p>
        </div>
    );
};

export default WindDirection;
