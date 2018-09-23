import PressureOverview from "components/footer/PressureOverview";
import TemperatureOverview from "components/footer/TemperatureOverview";
import WindOverview from "components/footer/WindOverview";
import gql from "graphql-tag";
import * as React from "react";
import { ChildProps, graphql } from "react-apollo";
import { Col, Container, Row } from "reactstrap";
import {PressureRecord, TemperatureRecord, WindRecord} from "types/weather/WeatherRecords";

interface Response {
    latestPressures: PressureRecord[];
    latestWinds: WindRecord[];
    latestTemperatures: TemperatureRecord[];
}

class Footer extends React.PureComponent<ChildProps<{}, Response>> {

    public render(): JSX.Element {
        const {latestPressures, latestTemperatures, latestWinds, loading} = this.props.data;
        const pressures = (<PressureOverview loading={loading} pressureRecords={latestPressures}/>);
        const winds = (<WindOverview loading={loading} windRecords={latestWinds}/>);
        const temperatures = (<TemperatureOverview loading={loading} temperatureRecords={latestTemperatures}/>);

        return (
            <Container fluid={true} className="mx-0 px-0">
                <Row className="mx-0 px-0">
                    {this.renderCol(temperatures, "temperature-overview")}
                    {this.renderCol(winds, "wind-overview")}
                    {this.renderCol(pressures, "pressure-overview")}
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

export default graphql(LATEST_WEATHER_RECORD_QUERY, {
    options: {
        pollInterval: 5000,
    },
})(Footer);
