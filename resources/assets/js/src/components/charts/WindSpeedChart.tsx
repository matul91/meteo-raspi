import axios from 'axios';
import * as React from 'react';
import {Line} from 'react-chartjs-2';

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
        axios.get('/temperatures').then((response: any) => {
            const labels: any[] = [];
            const data: any[] = [];
            for (const row of response.data.length) {
                labels.push(row.date);
                data.push(row.wind);
            }
            this.setState({
                labels,
                data,
            });
        });
    }
    public render(): JSX.Element {
        if (this.state.data) {
            const data = {
                labels: this.state.labels,
                datasets: [
                  {
                    label: 'Rychlost větru',
                    fill: true,
                    lineTension: 0.2,
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderCapStyle: 'butt',
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: 'miter',
                    pointBorderColor: 'rgba(75,192,192,1)',
                    pointBackgroundColor: '#fff',
                    pointBorderWidth: 1,
                    pointHoverRadius: 5,
                    pointHoverBackgroundColor: 'rgba(75,192,192,1)',
                    pointHoverBorderColor: 'rgba(220,220,220,1)',
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: this.state.data,
                  },
                ],
              };
            return (
                <Line data={data} />
            );
        }
        return <div>Loading...</div>;
    }
}
