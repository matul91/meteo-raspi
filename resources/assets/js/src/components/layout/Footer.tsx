import PressureOverview from "components/footer/PressureOverview";
import TemperatureOverview from "components/footer/TemperatureOverview";
import WindOverview from "components/footer/WindOverview";
import { ONE_MINUTE } from "config/constants/intervals";
import gql from "graphql-tag";
import * as React from "react";
import { ChildProps, graphql } from "react-apollo";
import { Col, Container, Row } from "reactstrap";
import { PressureRecord, TemperatureRecord, WindRecord } from "types/weather/WeatherRecords";

interface Response {
    latestPressures: PressureRecord[];
    latestWinds: WindRecord[];
    latestTemperatures: TemperatureRecord[];
}

const LATEST_WEATHER_RECORD_QUERY = gql`
    {
        latestTemperatures {
            temperature
            date
        }

        latestWinds {
            speed
            direction
            date
        }

        latestPressures {
            pressure
            date
        }
    }
`;

class Footer extends React.PureComponent<ChildProps<{}, Response>> {

    public render(): JSX.Element {
        return (
            <Container fluid={true} className="mx-0 px-0">
                <Row className="mx-0 px-0">
                    {this.renderCol(this.temperatures(), "temperature-overview")}
                    {this.renderCol(this.winds(), "wind-overview")}
                    {this.renderCol(this.pressures(), "pressure-overview")}
                </Row>
            </Container>
        );
    }

    protected renderCol(children: JSX.Element, className: string): JSX.Element {
        return (
            <Col md={4} className={`${className} px-0 mx-0`}>
                <Row className="text-center no-gutters">
                    {children}
                </Row>
            </Col>
        );
    }

    protected temperatures(): JSX.Element {
        const {latestTemperatures, loading} = this.props.data;
        return (
            <TemperatureOverview
                requiredCellCount={4}
                records={latestTemperatures}
                unit={"°C"}
                loaderColor={"#6e96f2"}
                isLoading={loading}
            />
        );
    }

    protected winds(): JSX.Element {
        const {latestWinds, loading} = this.props.data;
        return (
            <WindOverview
                requiredCellCount={4}
                records={latestWinds}
                unit={"m/s"}
                loaderColor={"#ffb400"}
                isLoading={loading}
            />
        );
    }

    protected pressures(): JSX.Element {
        const {latestPressures, loading} = this.props.data;
        return (
            <PressureOverview
                requiredCellCount={3}
                records={latestPressures}
                unit={"hPa"}
                loaderColor={"#66f000"}
                isLoading={loading}
            />
        );
    }
}

export default graphql(LATEST_WEATHER_RECORD_QUERY, {
    options: {
        pollInterval: ONE_MINUTE,
    },
})(Footer);
