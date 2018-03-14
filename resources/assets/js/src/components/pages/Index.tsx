import * as React from "react";
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
            <div className="col-md-6" key={chart.columnName}>
                <Chart name={chart.name} url={chart.url} columnName={chart.columnName} suffix={chart.suffix} />
            </div>
        );
    });
    return (
        <div className="row">
            {charts}
        </div>
    );
};

export default Index;
