import * as React from "react";
import {Col, PageHeader, Row} from "react-bootstrap";
import PhotosHistory from "../photosHistory/PhotosHistory";

const LoggedUser = () => {
    return (
        <Row>
            <Col xs={12}>
                <PageHeader>
                    User's page
                </PageHeader>
                <Row>
                    <Col sm={6}>
                        <PhotosHistory />
                    </Col>
                </Row>
            </Col>
        </Row>
    );
};

export default LoggedUser;
