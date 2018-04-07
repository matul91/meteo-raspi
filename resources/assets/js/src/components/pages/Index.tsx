import * as React from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import AerialPhoto from "../aerialPhoto/AerialPhoto";
import Chart from "../chart/Chart";
import CurrentPhoto from "../currentPhoto/CurrentPhoto";
import Loading from "../loading/Loading";

interface IProps {
    charts: any;
    error: any;
    isLoaded: boolean;
}

class Index extends React.Component<IProps, void> {
    public render(): JSX.Element {
        let content = <Loading text="Loading..."/>;
        const charts = this.getCharts();
        if (this.props.isLoaded) {
            content = (
                <React.Fragment>
                    <Row>
                        {charts}
                    </Row>
                    <Row>
                        <Col md={6}>
                            <AerialPhoto direction="NNE" speed="40" suffix="m/s" />
                        </Col>
                        <Col md={6}>
                            <CurrentPhoto />
                        </Col>
                    </Row>
                </React.Fragment>
            );
        }
        return content;
    }

    private getCharts(): JSX.Element[] {
        return Object.keys(this.props.charts).map((chartName) => {
            return (
                <Col md={6} key={this.props.charts[chartName].columnName}>
                    <Chart
                        chartName={chartName}
                        data={this.props.charts[chartName].data}
                        dataMeta={this.props.charts[chartName].dataMeta}
                        initialDate={this.props.charts[chartName].initialDate}
                        initialValue={this.props.charts[chartName].initialValue}
                        name={this.props.charts[chartName].name}
                        url={this.props.charts[chartName].url}
                        columnName={this.props.charts[chartName].columnName}
                        suffix={this.props.charts[chartName].suffix}
                    />
                </Col>
            );
        });
    }
}

const mapStateToProps = (state) => {
    return {
        charts: state.weather.charts,
        error: state.weather.error,
        isLoaded: state.weather.loading !== true,
    };
};

export default connect(mapStateToProps, null)(Index);
