import React, {useState, useEffect, useRef} from 'react';
import classNames from 'classnames';

import Btn from '../btn';

type StickyState = boolean;

const data = {
    locality: 'RC Letiste Lubno',
    time: '12:34',
    date: '12. ledna 2020'
};

export const Locality = () => {

    const [isStuck, setSticky] = useState<StickyState>(false);

    const refTriggerEl = useRef<HTMLDivElement>(null);
    const refLocalityEl = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver( 
            ([entry]) => setSticky(entry.intersectionRatio < 1), {
                threshold: 1.0
            }
        );
          
        refTriggerEl.current && observer.observe(refTriggerEl.current); 
    }, []);

    const {locality, time, date} = data;

    return(
        <>
            <div className={classNames('locality', 'u-mb-1', {
                'locality--isStuck': isStuck
            })} ref={refLocalityEl}>
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
            <div className="localityTrigger" ref={refTriggerEl} />
            {isStuck &&
                <div style={{height: refLocalityEl.current?.getBoundingClientRect().height * 1.5 || 0}} />
            }
        </>
    );
};
