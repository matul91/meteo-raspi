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
                <PhotosHistory />
            </Col>
        </Row>
    );
};

export default LoggedUser;
