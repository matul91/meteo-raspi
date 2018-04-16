import * as React from "react";
import { connect } from "react-redux";

const WindDirection = (props) => {
    return (
        <div className="wind-direction">
            <img
                src={`/images/directions/${props.windDirection}.png`}
                alt={props.windDirection}
                className="img-responsive"
            />
            <p>{props.windSpeed} {props.suffix}</p>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        suffix: state.weather.dataSets.wind.suffix,
        windDirection: state.weather.dataSets.wind.initialDirection,
        windSpeed: state.weather.dataSets.wind.initialValue,
    };
};

export default connect(mapStateToProps, null)(WindDirection);
