import Loading from "components/loading/Loading";
import PhotosHistory from "components/photosHistory/PhotosHistory";
import SuccessAlert from "components/statusAlerts/SuccessAlert";
import * as React from "react";
import { connect } from "react-redux";
import { Alert, Col, Media, Row } from "reactstrap";

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
                    <Col xs={11} sm={7}>
                        <PhotosHistory/>
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
