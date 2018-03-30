import * as React from "react";
import {Panel} from "react-bootstrap";
import WindDirection from "../windDirection/WindDirection";

const AerialPhoto = (props) => {
    return (
        <Panel className="current-photo">
            <Panel.Heading>
                <Panel.Title>Aerial photo</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
                <WindDirection direction={props.direction} speed={props.speed} suffix={props.suffix} />
                <img src="../../../../images/map-google.JPG" alt="Aerial Photo" className="img-responsive" />
            </Panel.Body>
        </Panel>
    );
};

export default AerialPhoto;
