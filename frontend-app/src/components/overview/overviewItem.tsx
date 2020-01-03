import React from 'react';

import { Overview, OverviewRecord } from './types';

export default class OverviewItem extends React.PureComponent<Overview, {}> {
    render() {
        return (
            <div className="overviewItem">
                <div className="u-d-f u-mb-1">
                    <div className="overviewItem__icon">
                        <span className="icon">{this.props.icon}</span>
                    </div>
                    <div>
                        <div className="overviewItem__title">{this.props.title}</div>
                        <div className="u-d-f">
                            <span className="overviewItem__value">{this.props.currentValue}</span>
                            <span className="overviewItem__unit">{this.props.unit}</span>
                        </div>
                    </div>
                </div>
                <div className="u-d-f u-ta-c u-jc-se u-hsp-05">
                    {this.props.records.map((record: OverviewRecord, index: number) => {
                        return (
                            <div key={index} className="recordItem">
                                <div className="recordItem__time">{record.time}</div>
                                <div className="recordItem__value">{record.value}</div>
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }
}
