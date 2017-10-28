import * as React from 'react';
import * as ReactDOM from 'react-dom';
import PressureChart from '../charts/PressureChart';
import TemperatureChart from '../charts/TemperatureChart';
import WindSpeedChart from '../charts/WindSpeedChart';

export default class App extends React.Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                    
                    <div className="col-md-6">
                        <div className="panel panel-default">
                            <div className="panel-heading">Tlak</div>

                            <div className="panel-body">
                                <PressureChart />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="panel panel-default">
                            <div className="panel-heading">Teplota</div>

                            <div className="panel-body">
                                <TemperatureChart />
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="panel panel-default">
                            <div className="panel-heading">Rychlost větru</div>

                            <div className="panel-body">
                                <WindSpeedChart />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

if (document.getElementById('app')) {
    ReactDOM.render(<App />, document.getElementById('app'));
}
