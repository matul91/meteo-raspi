import PhotosHistory from "components/photosHistory/PhotosHistory";
import * as React from "react";
import {Col, Row } from "reactstrap";
import WindDirection from "../components/windDirection/WindDirection";

export default class Main extends React.PureComponent {
    public render(): JSX.Element {
        return  (
            <Row className="no-gutters">
                <Col xs={10} md={3}>
                    <PhotosHistory/>
                </Col>
                <Col xs={11} md={9}>
                    <WindDirection/>
                </Col>
            </Row>
        );
    }
}
