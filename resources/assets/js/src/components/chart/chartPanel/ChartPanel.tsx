import * as React from "react";
import {Panel} from "react-bootstrap";

const ChartPanel = (props) => {
    return (
        <Panel className="panel panel-default">
            <Panel.Heading>
                <Panel.Title>{props.heading}</Panel.Title>
            </Panel.Heading>
            <Panel.Body>{props.children}</Panel.Body>
        </Panel>
    );
};

export default ChartPanel;
