import PhotoThumbnail from "components/photosHistory/PhotoThubmnail";
import { ONE_MINUTE } from "config/constants/intervals";
import gql from "graphql-tag";
import * as React from "react";
import {ChildProps, graphql} from "react-apollo";
import { Alert, Col, Row } from "reactstrap";
import { Photo } from "types/photo/Photo";
import {Heading} from "./Heading";

interface Response {
    latestPhotos: Photo[];
}

const LATEST_PHOTOS_QUERY = gql`
    {
        latestPhotos(limit: 2) {
            link
            createdAt
        }
    }
`;

class PhotosHistory extends React.Component<ChildProps<{}, Response>> {

    public render(): JSX.Element {
        if (this.props.data.loading) {
            return (<Heading isLoading={true}/>);
        }

        return (
            <React.Fragment>
                <Heading isLoading={false}/>
                <Row>
                    <Col xs={2} sm={5} />
                    <Col xs={10} sm={7}>
                        {this.getImages()}
                    </Col>
                </Row>
            </React.Fragment>
        );
    }

    private getImages(): JSX.Element[] {
        return this.props.data.latestPhotos.map((photo, index) => {
            return (
               <PhotoThumbnail key={index} photo={photo}/>
            );
        });
    }
}

export default graphql(LATEST_PHOTOS_QUERY, {
    options: {
        pollInterval: ONE_MINUTE,
    },
})(PhotosHistory);
