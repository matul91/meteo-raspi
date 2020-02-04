import React from 'react';

export default class Gallery extends React.PureComponent<{}, {}> {

    images: any = [
        {
            src: 'https://raspi.jiri-matula.cz/photos/2020/02/2020-02-04-15-00-06.jpg',
            time: 'ted'
        },{
            src: 'https://raspi.jiri-matula.cz/photos/2020/02/2020-02-04-15-00-06.jpg',
            time: '10:45'
        },{
            src: 'https://raspi.jiri-matula.cz/photos/2020/02/2020-02-04-15-00-06.jpg',
            time: '10:30'
        },{
            src: 'https://raspi.jiri-matula.cz/photos/2020/02/2020-02-04-15-00-06.jpg',
            time: '10:15'
        },{
            src: 'https://raspi.jiri-matula.cz/photos/2020/02/2020-02-04-15-00-06.jpg',
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
