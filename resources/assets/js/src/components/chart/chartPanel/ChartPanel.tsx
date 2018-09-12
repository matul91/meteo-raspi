import * as React from "react";
import { Card,  CardBody, CardTitle } from "reactstrap";

const ChartPanel = (props) => {
    return (
        <Card>
            <CardBody>
                <CardTitle>{props.heading}</CardTitle>
                {props.children}
            </CardBody>
        </Card>
    );
};

export default ChartPanel;
