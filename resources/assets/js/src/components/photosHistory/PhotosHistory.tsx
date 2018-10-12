import Icon from "components/svgIcon/SvgIcon";
import * as React from "react";
import { Alert } from "reactstrap";

interface IProps {
    imageLinks?: string[];
}

export default class PhotosHistory extends React.Component<IProps> {

    private static defaultProps = {
        imageLinks: [
            "/images/camera-picture.png",
            "/images/camera-picture.png",
            "/images/camera-picture.png",
        ],
    };

    public render(): JSX.Element {
        return (
            <React.Fragment>
                <Alert color="primary">
                    <div className="d-flex">
                        <div className="p-2">
                            <span className="text-uppercase">Poslední <br/> snímky</span>
                        </div>
                        <div className="p-2 ml-auto align-self-center" >
                            <Icon kind="history" />
                        </div>
                    </div>
                </Alert>
                <div>
                    {this.getImages()}
                </div>
            </React.Fragment>
        );
    }

    private getImages(): JSX.Element[] {
        return this.props.imageLinks.map((imageLink, index) => {
            return (
                <div key={index} className="d-flex justify-content-end mb-4">
                    <img className="img-fluid img-snapshot" src={imageLink} />
                </div>
            );
        });
    }
}
