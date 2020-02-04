import React from 'react';

import Btn from '../btn';

export default class Locality extends React.PureComponent<{}, {}> {
    render() {
        const locality = 'RC Letiste Lubno';
        const time = '12:34';
        const date = '12. ledna 2020';

        return (
            <div className="layout__locality container u-mb-1">
                <div className="u-d-f u-ai-c">
                    <h1 className="h1 u-f-a u-mr-1">{locality}</h1>
                    <div className="u-f-n">
                        <Btn
                            onClick={() => {}}>
                            Lokalita
                        </Btn>
                    </div>
                </div>
                <div>
                    <span className="locality__time">{time} | </span>
                    <span className="locality__date">{date}</span>
                </div>
            </div>
        );
    }
}
