import * as React from "react";

const WindDirection = (props) => {
    return (
        <div className="wind-direction">
            <img src="../../../../images/wind-rose.png" alt="wind-rose" className="img-responsive" />
            <p><strong>Direction:</strong> {props.direction}</p>
            <p><strong>Wind speed:</strong> {props.speed}</p>
        </div>
    );
};

export default WindDirection;
