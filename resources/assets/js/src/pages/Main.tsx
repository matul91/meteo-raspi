import PhotosHistory from "components/photosHistory/PhotosHistory";
import * as React from "react";
import { connect } from "react-redux";
import { Alert, Col, Media, Row } from "reactstrap";

export default class Main extends React.PureComponent {
    public render(): JSX.Element {
        return  (
            <Row className="no-gutters">
                <Col xs={11} sm={7}>
                    <PhotosHistory/>
                </Col>
            </Row>
        );
    }
}
