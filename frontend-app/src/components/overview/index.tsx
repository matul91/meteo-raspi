import React from 'react';

export default class Overview extends React.PureComponent<{}, {}> {

    data = [{
        time: '10:30',
        wind: {
            value: 12,
            unit: 'm/s'
        },
        temperature: {
            value: 12,
            unit: 'C'
        },
        humidity: {
            value: 12,
            unit: '%'
        },
        pressure: {
            value: 12,
            unit: 'hpa'
        }
    },{
        time: '10:30',
        wind: {
            value: 12,
            unit: 'm/s'
        },
        temperature: {
            value: 12,
            unit: 'C'
        },
        humidity: {
            value: 12,
            unit: '%'
        },
        pressure: {
            value: 12,
            unit: 'hpa'
        }
    },{
        time: '10:30',
        wind: {
            value: 12,
            unit: 'm/s'
        },
        temperature: {
            value: 12,
            unit: 'C'
        },
        humidity: {
            value: 12,
            unit: '%'
        },
        pressure: {
            value: 12,
            unit: 'hpa'
        }
    },{
        time: '10:30',
        wind: {
            value: 12,
            unit: 'm/s'
        },
        temperature: {
            value: 12,
            unit: 'C'
        },
        humidity: {
            value: 12,
            unit: '%'
        },
        pressure: {
            value: 12,
            unit: 'hpa'
        }
    },{
        time: '10:30',
        wind: {
            value: 12,
            unit: 'm/s'
        },
        temperature: {
            value: 12,
            unit: 'C'
        },
        humidity: {
            value: 12,
            unit: '%'
        },
        pressure: {
            value: 12,
            unit: 'hpa'
        }
    }];

    render() {
        return (
            <div className="overview layout__overview container">

                {this.data.map((item: any, index: number) =>
                    <div className="overviewItem">
                        <div className="overviewItem__value overviewItem__value--time">
                            {item.time}
                        </div>
                        <div className="overviewItem__value">
                            {item.wind.value}
                            <span className="overviewItem__unit">m/s</span>
                        </div>
                        <div className="overviewItem__value">
                            {item.temperature.value}
                            <span className="overviewItem__unit">{item.temperature.unit}</span>
                        </div>
                        <div className="overviewItem__value">
                            {item.humidity.value}
                            <span className="overviewItem__unit">{item.humidity.unit}</span>
                        </div>
                        <div className="overviewItem__value">
                            {item.pressure.value}
                            <span className="overviewItem__unit">{item.pressure.unit}</span>
                        </div>
                    </div>
                )}
            </div>
        );
    }
}
