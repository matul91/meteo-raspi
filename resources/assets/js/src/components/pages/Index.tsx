import * as React from "react";
import Chart from "../chart/Chart";

const Index = () => {
    return (
        <div className="row">
            <Chart name={"Tlak"} url={"/pressures"} columnName={"pressure"} suffix={"hPa"} />
            <Chart name={"Teplota"} url={"/temperatures"} columnName={"temperature"} suffix={"°C"} />
            <Chart name={"Rychlost větru"} url={"/winds"} columnName={"speed"} suffix={"m/s"} />
        </div>
    );
};

export default Index;
