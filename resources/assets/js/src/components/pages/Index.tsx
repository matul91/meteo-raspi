import * as React from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import AerialPhoto from "../aerialPhoto/AerialPhoto";
import Chart from "../chart/Chart";
import CurrentPhoto from "../currentPhoto/CurrentPhoto";
import Loading from "../loading/Loading";

interface IProps {
    dataSets: any;
    error: any;
    isLoaded: boolean;
    windDirection: string;
    windSpeed: number;
    windSuffix: string;
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
                            <AerialPhoto
                                direction={this.props.windDirection}
                                speed={this.props.windSpeed}
                                suffix={this.props.windSuffix}
                            />
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
        return Object.keys(this.props.dataSets).map((setName) => {
            return (
                <Col md={6} key={this.props.dataSets[setName].columnName}>
                    <Chart
                        setName={setName}
                        data={this.props.dataSets[setName].data}
                        dataMeta={this.props.dataSets[setName].dataMeta}
                        initialDate={this.props.dataSets[setName].initialDate}
                        initialValue={this.props.dataSets[setName].initialValue}
                        name={this.props.dataSets[setName].name}
                        url={this.props.dataSets[setName].url}
                        columnName={this.props.dataSets[setName].columnName}
                        suffix={this.props.dataSets[setName].suffix}
                        error={this.props.dataSets[setName].error}
                    />
                </Col>
            );
        });
    }
}

const mapStateToProps = (state) => {
    return {
        dataSets: state.weather.dataSets,
        error: state.weather.error,
        isLoaded: state.weather.loading !== true,
        windDirection: state.weather.dataSets.wind.initialDirection,
        windSpeed: state.weather.dataSets.wind.initialValue,
        windSuffix: state.weather.dataSets.wind.suffix,
    };
};

export default connect(mapStateToProps, null)(Index);
