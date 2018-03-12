import * as React from "react";
import Chart from "../chart/Chart";

const Index = () => {
    return (
        <div className="row">
            <div className="col-md-6">
                <Chart name={"Tlak"} url={"pressures"} columnName={"pressure"} suffix={"hPa"} />
            </div>
            <div className="col-md-6">
                <Chart name={"Teplota"} url={"temperatures"} columnName={"temperature"} suffix={"°C"} />
            </div>
            <div className="col-md-6">
                <Chart name={"Rychlost větru"} url={"winds"} columnName={"speed"} suffix={"m/s"} />
            </div>
        </div>
    );
};

export default Index;
