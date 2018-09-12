import WindDirection from "components/windDirection/WindDirection";
import * as React from "react";
import { Panel } from "react-bootstrap";

const AerialPhoto = () => {
    return (
        <Panel className="current-photo">
            <Panel.Heading>
                <Panel.Title>Aerial photo</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
                <WindDirection />
                <img
                    src="/images/map-seznam-3D-lubno.jpg"
                    alt="Aerial Photo"
                    className="img-responsive"
                />
            </Panel.Body>
        </Panel>
    );
};

export default AerialPhoto;
