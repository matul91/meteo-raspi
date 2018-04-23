import * as React from "react";
import { Carousel, Panel } from "react-bootstrap";

const photos = [
    {
        alt: "photo 1",
        id: 1,
        src: "http://via.placeholder.com/1920x1080",
    },
    {
        alt: "photo 2",
        id: 2,
        src: "http://via.placeholder.com/1920x1080",
    },
];

export default class PhotosHistory extends React.Component {
    public render(): JSX.Element {
        const carouselItems = this.getCarouselItems();

        return (
            <Panel>
                <Panel.Heading>
                    <Panel.Title>Photos history viewer</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                    <Carousel>
                        {carouselItems}
                    </Carousel>
                </Panel.Body>
            </Panel>
        );
    }

    private getCarouselItems(): JSX.Element[] {
        return photos.map((photo) => {
            return (
                <Carousel.Item key={photo.id}>
                    <img alt={photo.alt} src={photo.src} className="img-responsive" />
                </Carousel.Item>
            );
        });
    }
}
