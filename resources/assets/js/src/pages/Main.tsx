import PhotosHistory from "components/photosHistory/PhotosHistory";
import * as React from "react";
import { connect } from "react-redux";
import { Alert, Col, Media, Row } from "reactstrap";
import StatusAlertsExample from "../components/statusAlerts/StatusAlertsExample";
import WindDirection from "../components/windDirection/WindDirection";

export default class Main extends React.PureComponent {
    public render(): JSX.Element {
        return  (
            <Row className="no-gutters">
                <Col xs={3}>
                    <PhotosHistory/>
                </Col>
                <Col xs={6}>
                    <WindDirection/>
                </Col>
                <Col xs={3}>
                    <StatusAlertsExample />
                </Col>
            </Row>
        );
    }
}
