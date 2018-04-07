import * as React from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import AerialPhoto from "../aerialPhoto/AerialPhoto";
import Chart from "../chart/Chart";
import CurrentPhoto from "../currentPhoto/CurrentPhoto";

const Index = (props) => {
    const charts = Object.keys(props.charts).map((chartName) => {
        return (
            <Col md={6} key={props.charts[chartName].columnName}>
                <Chart
                    name={props.charts[chartName].name}
                    url={props.charts[chartName].url}
                    columnName={props.charts[chartName].columnName}
                    suffix={props.charts[chartName].suffix}
                />
            </Col>
        );
    });
    return (
        <React.Fragment>
            <Row>
                {charts}
            </Row>
            <Row>
                <Col md={6}>
                    <AerialPhoto direction="NNE" speed="40" suffix="m/s" />
                </Col>
                <Col sm={6}>
                    <CurrentPhoto />
                </Col>
            </Row>
        </React.Fragment>
    );
};

const mapStateToProps = (state) => {
    return {
        charts: state.weather.charts,
        error: state.weather.error,
        loading: state.weather.loading,
    };
};

export default connect(mapStateToProps, null)(Index);
