import * as React from "react";
import {Col, Row} from "react-bootstrap";
import Chart from "../chart/Chart";

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
        <Row>
            {charts}
        </Row>
    );
};

export default Index;
