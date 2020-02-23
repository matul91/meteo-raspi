import React from 'react';
import { useQuery } from '@apollo/react-hooks';

import { CONDITION_TYPE } from '../../constants/conditions';
import { ConditionsType } from '../../types/conditions';
import { CURRENT_CONDITIONS_RECORDS_QUERY } from './query';
import { CurrentConditionsData } from './types';

import Btn from '../btn';
import Graph from './graph';

export default function Overview() {

    // const { data } = useQuery<CurrentConditionsData>(
    //     CURRENT_CONDITIONS_RECORDS_QUERY,
    //     {
    //         pollInterval: 5000
    //     }
    // );

    const data = [{
        type: CONDITION_TYPE.TEMPERATURE,
        label: 'Teplota',
        value: 24,
        unit: '°C',
        isGraphShown: false
    },{
        type: CONDITION_TYPE.HUMIDITY,
        label: 'Vlhkost',
        value: 100,
        unit: '%',
        isGraphShown: false
    },{
        type: CONDITION_TYPE.PRESSURE,
        label: 'Tlak',
        value: 1212,
        unit: 'hPa',
        isGraphShown: false
    }];

    const graphData: any = [{
        value: 24,
        label: 'ted'

    },{
        value: 22,
        label: '12:00'

    },{
        value: 21,
        label: '11:00'

    },{
        value: 17,
        label: '10:00'

    },{
        value: 15,
        label: '09:00'
    },{
        value: 18,
        label: '08:00'
    }];

    return (
        <div className="layout__overview container u-vsp-2 u-mt-2">
            <div className="u-d-f u-jc-sb">
                {data.map((item, index) =>
                    <div key={index} className="overviewItem">
                        <div className="icon icon--medium u-ml-a u-mr-a">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                                <path d="M23.9819 5.96302C23.2919 5.97302 22.7399 6.54002 22.7499 7.23002V41.147C22.7259 42.837 25.2739 42.837 25.2499 41.147V7.23002C25.2599 6.52602 24.6869 5.95302 23.9819 5.96302Z" />
                                <path d="M24.8829 5.96302C24.3879 5.48102 23.5969 5.49302 23.1159 5.98802L7.54589 21.558C6.33389 22.735 8.13589 24.538 9.31389 23.325L24.8839 7.75502C25.3879 7.26502 25.3879 6.45502 24.8839 5.96302H24.8829Z" />
                                <path d="M40.5029 23.3251C40.9829 22.83 40.9729 22.038 40.4779 21.557L24.9079 5.98705C23.7299 4.77505 21.9279 6.57705 23.1399 7.75505L38.7099 23.3251C39.1999 23.83 40.0119 23.83 40.5029 23.3251Z" />
                            </svg>
                        </div>
                        <div>
                            <div className="overviewItem__value">{item.value}</div>
                            <div className="overviewItem__unit">{item.unit}</div>
                        </div>
                        <div className="overviewItem__label">{item.label}</div>
                        <div className="u-d-f u-jc-c">
                            <Btn onClick={() => console.log(item.type)}>
                                graf
                            </Btn>
                        </div>
                    </div>
                )}
            </div>
            <Graph
                title="Vyvoj teploty [°C]"
                data={graphData} />
            <Graph
                title="Vyvoj vlhkosti [%]"
                data={graphData} />
            <Graph
                title="Vyvoj tlaku [hPa]"
                data={graphData} />
        </div>
    );
}
