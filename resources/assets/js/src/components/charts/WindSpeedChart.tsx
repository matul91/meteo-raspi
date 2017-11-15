import axios from "axios";
import * as React from "react";
import {Line} from "react-chartjs-2";

interface IState {
    data: any[];
    labels: any[];
}

export default class WindSpeedChart extends React.Component<{}, IState> {
    public state = {
        data: null,
        labels: null,
    };

    constructor(props) {
        super(props);
    }

    public componentDidMount(): void {
        axios.get("/winds").then((response: any) => {
            const labels: any[] = [];
            const data: any[] = [];
            for (const row of response.data) {
                labels.push(row.date);
                data.push(row.speed);
            }
            this.setState({
                data,
                labels,
            });
        });
    }

    public render(): JSX.Element {
        if (this.state.data) {
            const data = {
                datasets: [
                    {
                        backgroundColor: "rgba(75,192,192,0.4)",
                        borderCapStyle: "butt",
                        borderColor: "rgba(75,192,192,1)",
                        borderDash: [],
                        borderDashOffset: 0.0,
                        borderJoinStyle: "miter",
                        data: this.state.data,
                        fill: true,
                        label: "Rychlost větru",
                        lineTension: 0.2,
                        pointBackgroundColor: "#fff",
                        pointBorderColor: "rgba(75,192,192,1)",
                        pointBorderWidth: 1,
                        pointHitRadius: 10,
                        pointHoverBackgroundColor: "rgba(75,192,192,1)",
                        pointHoverBorderColor: "rgba(220,220,220,1)",
                        pointHoverBorderWidth: 2,
                        pointHoverRadius: 5,
                        pointRadius: 1,
                    },
                ],
                labels: this.state.labels,
            };
            return (
                <Line data={data}/>
            );
        }
        return <div>Loading...</div>;
    }
}
