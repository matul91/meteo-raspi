import * as React from "react";
import {Col, PageHeader, Row} from "react-bootstrap";
import PhotosHistory from "../photosHistory/PhotosHistory";
import WindDirection from "../windDirection/WindDirection";

const LoggedUser = () => {
    return (
        <Row>
            <Col xs={12}>
                <PageHeader>
                    User's page
                </PageHeader>
                <Row>
                    <Col sm={6}>
                        <WindDirection />
                    </Col>
                    <Col sm={6}>
                        <PhotosHistory />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default LoggedUser;
