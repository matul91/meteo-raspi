import React from 'react';

import Btn from '../btn';

type State = {
    isStuck: boolean;
}

export default class Locality extends React.PureComponent<{}, State> {

    state = {
        isStuck: false
    }

    refTriggerEl = React.createRef<HTMLDivElement>();
    refLocalityEl = React.createRef<HTMLDivElement>();

    componentDidMount() {
        const observer = new IntersectionObserver( 
            ([entry]) => this.setState({
                isStuck: entry.intersectionRatio < 1
            }), {
                threshold: 1.0
            }
        );
          
        this.refTriggerEl.current && observer.observe(this.refTriggerEl.current); 
    };

    render() {
        const locality = 'RC Letiste Lubno';
        const time = '12:34';
        const date = '12. ledna 2020';

        const className = this.state.isStuck ? 'locality--isStuck' : '';

        return (
            <>
                <div className={`locality ${className} u-mb-1`} ref={this.refLocalityEl}>
                    <div className="container u-d-f">
                        <div className="u-f-a u-mr-1">
                            <h1 className="h1">{locality}</h1>
                            <div>
                                <span className="locality__time">{time}</span>
                                <span className="locality__date"> | {date}</span>
                            </div>
                        </div>
                        <div className="u-f-n">
                            <Btn onClick={() => {}}>
                                Lokalita
                            </Btn>
                        </div>
                    </div>
                </div>
                <div className="localityTrigger" ref={this.refTriggerEl} />
                {this.state.isStuck &&
                    <div style={{height: this.refLocalityEl.current?.getBoundingClientRect().height * 1.5 || 0}} />
                }
            </>
        );
    }
}
