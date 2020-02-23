import React from 'react';

type Props = {
    title: string;
    data: [];
}

type State = {
    min: number;
    max: number;
}

export default class Graph extends React.PureComponent<Props, State> {

    getInitialState = () => {
        const values: number[] = [];
        this.props.data.forEach((i: any) => values.push(i.value));

        const offset = 1;

        return {
            min: Math.min(...values) - offset,
            max: Math.max(...values) + offset
        };
    };

    state = this.getInitialState();

    getBarPercentage = (value: number) => (value - this.state.min) * 100 / (this.state.max - this.state.min);

    render() {
        return (
            <div>
                <h2 className="h2">{this.props.title}</h2>
                <div className="graph u-d-f u-jc-sb">
                    {this.props.data.map((item: any, index: number) =>
                        <div key={index} className="graphItem">
                            <div className="graphItem__bar">
                                <div style={{height: `${this.getBarPercentage(item.value)}%`}} />
                            </div>
                            <div className="graphItem__time">{item.label}</div>
                            <div className="graphItem__value">{item.value}</div>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}
