import React from 'react';

import WindItem from './windItem';

export default class Main extends React.PureComponent<{}, {}> {

    render() {

        const data: any = [{
            title: 'Vitr',
            value: '12',
            unit: 'm/s',
            direction: 'N'
        },{
            title: '12:00',
            value: '13',
            unit: 'm/s',
            direction: 'NE'
        },{
            title: '11:00',
            value: '9',
            unit: 'm/s',
            direction: 'NE'
        },{
            title: '10:00',
            value: '33',
            unit: 'm/s',
            direction: 'NE'
        }];

        return (
            <main className="layout__main container u-mb-2">
                <div className="main__locality" />
                <div className="u-d-f">
                    <div className="icon icon--medium u-mt-05">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                            <path d="M15.9 4a1.3 1.3 0 00-1.2 1.3v3.4L10 17a1.3 1.3 0 000 1.3l4.7 8.1V29a1.3 1.3 0 001.6 1.2l8.2-2.2a1.3 1.3 0 00.4-.1l9.7-2.6a1.3 1.3 0 00.4-.1l8.2-2.2a1.3 1.3 0 001-1.2v-9.3a1.3 1.3 0 00-1-1.2L35 9a1.3 1.3 0 00-.4-.1l-9.7-2.6a1.3 1.3 0 00-.4-.1L16.3 4a1.3 1.3 0 00-.4 0zM17.2 7l6 1.6v17.3l-6 1.6V9zM25.6 9l7.6 2v12l-7.6 2zM35.7 12l6 1.5v7.4l-6 1.6zm-21 1.9v7.5l-2.2-3.8z" />
                            <path d="M8.1 13.3c-2.3 0-4.3 1.9-4.3 4.2a4.3 4.3 0 108.5 0c0-2.3-1.9-4.2-4.2-4.2zm0 2.5c1 0 1.7.8 1.7 1.7s-.7 1.8-1.7 1.8-1.8-.8-1.8-1.8.8-1.7 1.8-1.7z" />
                            <path d="M8 19.3a1.3 1.3 0 00-1.2 1.2v22.2a1.3 1.3 0 102.5 0V20.5a1.3 1.3 0 00-1.2-1.2z" />
                        </svg>
                    </div>
                    {data.map((item: any, index: number) =>
                        <WindItem
                            key={index}
                            {...item}
                            isLarge={index === 0} />
                    )}
                </div>
            </main>
        );
    }
}
