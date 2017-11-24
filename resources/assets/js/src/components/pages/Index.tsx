import * as React from "react";
import Chart from "../chart/Chart";

const Index = () => {
    return (
        <div className="row">
            <Chart name={"Tlak"} url={"/pressures"} columnName={"pressure"} />
            <Chart name={"Teplota"} url={"/temperatures"} columnName={"temperature"} />
            <Chart name={"Rychlost větru"} url={"/winds"} columnName={"speed"} />
        </div>
    );
};

export default Index;
