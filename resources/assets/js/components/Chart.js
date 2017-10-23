import React, { Component } from 'react';
import {Line} from 'react-chartjs-2';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {data: null, labels: null};
    }
    componentDidMount() {
        axios.get('/data').then(response => {
            let labels = [];
            let data = [];
            for (var i = 0; i < response.data.length; i++) {
                labels.push(response.data[i].date);
                data.push(response.data[i].pressure);
            }
            this.setState({
                labels,
                data
            })
        });
    }
    render() {
        if (this.state.data) {
            const data = {
                labels: this.state.labels,
                datasets: [
                  {
                    label: 'Tlak',
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
                    data: this.state.data
                  }
                ]
              };
            return (
                <Line data={data} />
            );
        }
      
        return <div>Loading...</div>;
    }
}