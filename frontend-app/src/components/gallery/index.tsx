import React from 'react';

export default class Gallery extends React.PureComponent<{}, {}> {

    images: any = [
        {
            src: 'https://images.unsplash.com/photo-1576985599244-58dae7cdf824?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1700&q=80',
            time: 'ted'
        },{
            src: 'https://images.unsplash.com/photo-1576985599244-58dae7cdf824?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1700&q=80',
            time: '10:45'
        },{
            src: 'https://images.unsplash.com/photo-1576985599244-58dae7cdf824?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1700&q=80',
            time: '10:30'
        },{
            src: 'https://images.unsplash.com/photo-1576985599244-58dae7cdf824?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1700&q=80',
            time: '10:15'
        },{
            src: 'https://images.unsplash.com/photo-1576985599244-58dae7cdf824?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1700&q=80',
            time: '10:00'
        }
    ];

    render() {
        return (
            <div className="gallery">
                {this.images.map((image: any, index: number) =>
                    <figure key={index} className="gallery__item">
                        <img className="gallery__image" src={image.src} alt="" />
                        <figcaption className="gallery__label">{image.time}</figcaption>
                    </figure>
                )}
            </div>
        );
    }
}
