import Loading from "components/loading/Loading";
import StatusAlerts from "components/statusAlerts/StatusAlerts";
import * as React from "react";
import { connect } from "react-redux";
import { Alert, Col, Media, Row } from "reactstrap";
import PhotosHistory from "../photosHistory/PhotosHistory";

interface IProps {
    dataSets: any;
    error: any;
    isLoaded: boolean;
}

class Index extends React.Component<IProps, void> {
    public render(): JSX.Element {
        let content = <Loading text="Loading..."/>;
        if (this.props.isLoaded) {
            content = (
                <Row className="no-gutters">
                    <Col xs={3}>
                        <PhotosHistory/>
                    </Col>
                    <Col xs={6}/>
                    <Col xs={3}>
                        <StatusAlerts/>
                    </Col>
                </Row>
            );
        }
        return content;
    }
}

const mapStateToProps = (state) => {
    return {
        dataSets: state.weather.dataSets,
        error: state.weather.error,
        isLoaded: state.weather.loading !== true,
    };
};

export default connect(mapStateToProps, null)(Index);
