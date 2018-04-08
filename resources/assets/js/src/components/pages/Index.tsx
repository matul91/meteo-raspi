import * as React from "react";
import {Col, Row} from "react-bootstrap";
import AerialPhoto from "../aerialPhoto/AerialPhoto";
import Chart from "../chart/Chart";
import CurrentPhoto from "../currentPhoto/CurrentPhoto";

const chartData = [
    {
        columnName: "pressure",
        name: "Tlak",
        suffix: "hPa",
        url: "pressures",
    },
    {
        columnName: "temperature",
        name: "Teplota",
        suffix: "°C",
        url: "temperatures",
    },
    {
        columnName: "speed",
        name: "Rychlost větru",
        suffix: "m/s",
        url: "winds",
    },
];

const Index = () => {
    const charts = chartData.map((chart) => {
        return (
            <Col md={6} key={chart.columnName}>
                <Chart name={chart.name} url={chart.url} columnName={chart.columnName} suffix={chart.suffix} />
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

export default Index;
