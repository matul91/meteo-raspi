import * as React from "react";
import {Panel} from "react-bootstrap";

const CurrentPhoto = (props) => {
    return (
        <Panel className="current-photo">
            <Panel.Heading>
                <Panel.Title>Current photo</Panel.Title>
            </Panel.Heading>
            <Panel.Body>
                <img src="http://via.placeholder.com/1920x1080" alt="Current photo" className="img-responsive" />
            </Panel.Body>
        </Panel>
    );
};

export default CurrentPhoto;
