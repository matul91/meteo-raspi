import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { CONDITIONS } from '../../constants/conditions';
import { ConditionsType } from '../../types/conditions';
import { CURRENT_CONDITIONS_RECORDS_QUERY } from './query';
import { CurrentConditionsData } from './types';



export default function Conditions() {

    // const { data } = useQuery<CurrentConditionsData>(
    //     CURRENT_CONDITIONS_RECORDS_QUERY,
    //     {
    //         pollInterval: 5000
    //     }
    // );

    const data: CurrentConditionsData = {
        wind: [{
            value: 12,
            direction: 'NE'
        }],
        temperature: [{
            value: 33
        }],
        humidity: [{
            value: 74
        }],
        pressure: [{
            value: 1056
        }]
    };

    return (
        <div className="conditions layout__conditions container">
            {Object.entries(data).map(([key, values]) =>
                <div className="conditionItem" key={key}>
                    <div className="conditionItem__icon">
                        <span></span>
                    </div>
                    <div className="conditionItem__content">
                        <div className="u-d-f">
                            <span className="conditionItem__value">{values[0].value}</span>
                            <span className="conditionItem__unit">{CONDITIONS[key as ConditionsType].unit}</span>
                        </div>
                        <div className="conditionItem__label">{CONDITIONS[key as ConditionsType].title}</div>
                    </div>
                </div>
            )}
        </div>
    );
}
