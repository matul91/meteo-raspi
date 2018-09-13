import AerialPhoto from "components/aerialPhoto/AerialPhoto";
import Chart from "components/chart/Chart";
import CurrentPhoto from "components/currentPhoto/CurrentPhoto";
import Loading from "components/loading/Loading";
import * as React from "react";
import { connect } from "react-redux";
import { Col, Media, Row } from "reactstrap";
import {Route} from "react-router";
import StatusAlerts from "../statusAlerts/StatusAlerts";
import { Alert } from "reactstrap";
import Icon from "components/svgIcon/SvgIcon";

interface IProps {
    dataSets: any;
    error: any;
    isLoaded: boolean;
}

class Index extends React.Component<IProps, void> {
    public render(): JSX.Element {
        let content = <Loading text="Loading..."/>;
        const charts = this.getCharts();
        if (this.props.isLoaded) {
            content = (
                <Row className="no-gutters">
                    <Col xs={3}>
                        <Alert color="primary">
                            <div className="d-flex">
                                <div className="p-2">
                                    <span>Poslední <br/> snímky</span>
                                </div>
                                <div className="p-2 ml-auto align-self-center" >
                                    <Icon kind="history" />
                                </div>
                            </div>
                        </Alert>
                        <div>
                            <div className="d-flex justify-content-end mb-4">
                                <img className="img-fluid img-snapshot" src="/images/camera-pic.png" />
                            </div>
                            <div className="d-flex justify-content-end mb-4">
                                <img className="img-fluid img-snapshot" src="/images/camera-pic.png" />
                            </div>
                            <div className="d-flex justify-content-end mb-4">
                                <img className="img-fluid img-snapshot" src="/images/camera-pic.png" />
                            </div>
                        </div>
                    </Col>
                    <Col xs={6} />
                    <Col xs={3}>
                        <StatusAlerts/>
                    </Col>
                </Row>
            );
        }
        return content;
    }

    private getCharts(): JSX.Element[] {
        return Object.keys(this.props.dataSets).map((setName) => {
            return (
                <Col md={6} className="mb-4" key={this.props.dataSets[setName].columnName}>
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
                        loading={this.props.dataSets[setName].loading}
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
    };
};

export default connect(mapStateToProps, null)(Index);
