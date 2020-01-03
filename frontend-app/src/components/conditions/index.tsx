import React from 'react';

export default class Conditions extends React.PureComponent<{}, {}> {

    data = [{
        title: 'Wind',
        value: '12',
        unit: 'm/s'
    },{
        title: 'Temperature',
        value: '33',
        unit: '°C'
    },{
        title: 'Humidity',
        value: '73',
        unit: '%'
    },{
        title: 'Air pressure',
        value: '1234',
        unit: 'hPa'
    }];

    render() {
        return (
            <div className="conditions layout__conditions container">
                <div className="conditions__image"></div>
                <div className="conditions__overview">
                    {this.data.map((item, index: number) =>
                        <div className="conditionsItem" key={index}>
                            <div>
                                <span className="conditionsItem__value">{item.value}</span>
                                <span className="conditionsItem__unit">{item.unit}</span>
                            </div>
                            <div className="conditionsItem__label">{item.title}</div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
