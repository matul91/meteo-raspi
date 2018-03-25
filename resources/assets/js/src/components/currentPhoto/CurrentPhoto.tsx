import * as React from "react";
import {Panel} from "react-bootstrap";
import WindDirection from "../windDirection/WindDirection";

const CurrentPhoto = (props) => {
    return (
        <Panel className="current-photo">
            <Panel.Heading>
                <Panel.Title>Current photo and wind direction marker</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
                <WindDirection direction={props.direction} speed={props.speed} />
                <img src="http://via.placeholder.com/1920x1080" alt="Current photo" className="img-responsive" />
            </Panel.Body>
        </Panel>
    );
};

export default CurrentPhoto;
