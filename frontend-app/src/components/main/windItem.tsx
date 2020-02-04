import React from 'react';

type WindRecord = {
    title: string;
    value: number;
    unit: string;
    direction: WindDirection;
    isLarge?: boolean;
}

type WindDirection = 'N' | 'NE' | 'E' | 'SE' | 'S' | 'SW' | 'W' | 'NW';

export default class WindItem extends React.PureComponent<WindRecord, {}> {

    render() {

        const
            className = this.props.isLarge ? 'u-f-a u-ml-1' : 'u-f-n u-ml-2',
            iconClassName = this.props.isLarge ? 'icon--large' : 'icon--medium',
            valueClassName = this.props.isLarge ? 'windItem__value--large' : '';

        return (
            <div className={`windItem ${className}`}>
                <div className="windItem__direction">
                    <div className={`icon ${iconClassName}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                            <path d="M23.9819 5.96302C23.2919 5.97302 22.7399 6.54002 22.7499 7.23002V41.147C22.7259 42.837 25.2739 42.837 25.2499 41.147V7.23002C25.2599 6.52602 24.6869 5.95302 23.9819 5.96302Z" />
                            <path d="M24.8829 5.96302C24.3879 5.48102 23.5969 5.49302 23.1159 5.98802L7.54589 21.558C6.33389 22.735 8.13589 24.538 9.31389 23.325L24.8839 7.75502C25.3879 7.26502 25.3879 6.45502 24.8839 5.96302H24.8829Z" />
                            <path d="M40.5029 23.3251C40.9829 22.83 40.9729 22.038 40.4779 21.557L24.9079 5.98705C23.7299 4.77505 21.9279 6.57705 23.1399 7.75505L38.7099 23.3251C39.1999 23.83 40.0119 23.83 40.5029 23.3251Z" />
                        </svg>
                    </div>
                </div>
                <div className="windItem__title">{this.props.title}</div>
                <div className={`windItem__value ${valueClassName}`}>{this.props.value}</div>
                <div className="windItem__unit">{this.props.unit}</div>
            </div>
        );
    }
}



