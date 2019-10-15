import PhotoThumbnailModal from "components/photosHistory/PhotoThumbnailModal";
import * as DateFormats from "config/constants/dateFormats";
import * as moment from "moment";
import * as React from "react";
import { Card, CardImg, CardImgOverlay, CardText } from "reactstrap";
import { Photo } from "types/photo/Photo";

interface Props {
    photo: Photo;
}

interface State {
    isOpen: boolean;
}

class PhotoThumbnail extends React.PureComponent<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            isOpen: false,
        };
    }

    public toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen,
        });
    }

    public render(): JSX.Element {
        const photo = this.props.photo;
        const {link, createdAt} = photo;
        return (
            <React.Fragment>
                <div className={"mb-4 photo-thumbnail"} onClick={this.toggle}>
                    <Card inverse={true}>
                        <CardImg className={"img-snapshot"} src={link} alt={createdAt} />
                        <CardImgOverlay className={"d h-100 d-flex flex-column justify-content-end"}>
                            <CardText className={"text-right"}>
                                {moment(createdAt).add(2, "hours").format(DateFormats.HOURS_AND_MINUTES)}
                            </CardText>
                        </CardImgOverlay>
                    </Card>
                </div>
                <PhotoThumbnailModal onToggle={this.toggle} photo={photo} isOpen={this.state.isOpen} />
            </React.Fragment>
        );
    }
}

export default PhotoThumbnail;
