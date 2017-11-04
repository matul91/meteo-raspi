import * as React from 'react';
import PressureChart from '../components/charts/PressureChart';
import TemperatureChart from '../components/charts/TemperatureChart';
import WindSpeedChart from '../components/charts/WindSpeedChart';

export default class App extends React.Component {
    public render(): JSX.Element {
        return (
            <div className='container'>
                <div className='row'>
                    <div className='col-md-6'>
                        <div className='panel panel-default'>
                            <div className='panel-heading'>Tlak</div>
                            <div className='panel-body'>
                                <PressureChart />
                            </div>
                        </div>
                    </div>

                    <div className='col-md-6'>
                        <div className='panel panel-default'>
                            <div className='panel-heading'>Teplota</div>

                            <div className='panel-body'>
                                <TemperatureChart />
                            </div>
                        </div>
                    </div>

                    <div className='col-md-6'>
                        <div className='panel panel-default'>
                            <div className='panel-heading'>Rychlost větru</div>

                            <div className='panel-body'>
                                <WindSpeedChart />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
