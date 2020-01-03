import React from 'react';

import OverviewItem from './overviewItem';
// import { Overview } from './types';

export default class Overview extends React.PureComponent<{}, {}> {

    data = [{
        icon: '',
        title: 'Teplota',
        currentValue: 23,
        unit: '°C',
        records: [{
            time: '10:45',
            value: '23°'
        },{
            time: '10:30',
            value: '21°'
        },{
            time: '10:15',
            value: '20°'
        },{
            time: '10:00',
            value: '18°'
        },{
            time: '09:45',
            value: '17°'
        }]
    },{
        icon: '',
        title: 'Vlhkost',
        currentValue: 78,
        unit: '%',
        records: [{
            time: '10:45',
            value: 100
        },{
            time: '10:30',
            value: 90
        },{
            time: '10:15',
            value: 50
        },{
            time: '10:00',
            value: 33
        },{
            time: '10:00',
            value: 33
        }]
    },{
        icon: '',
        title: 'Tlak',
        currentValue: 1124,
        unit: 'hPa',
        records: [{
            time: '10:45',
            value: 1222
        },{
            time: '10:30',
            value: 987
        },{
            time: '10:15',
            value: 1024
        },{
            time: '10:15',
            value: 1024
        },{
            time: '10:15',
            value: 1024
        }]
    }]

    render() {
        return (
            <div className="overview layout__overview container">
                {this.data.map((overview, index: number) =>
                    <OverviewItem
                        key={index}
                        {...overview} />
                )}
            </div>
        );
    }
}
