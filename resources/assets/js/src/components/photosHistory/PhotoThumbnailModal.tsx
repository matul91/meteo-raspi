import * as React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { Photo } from "types/photo/Photo";

interface Props {
    photo: Photo;
    isOpen: boolean;
    toggle: () => void;
}

class PhotoThumbnailModal extends React.PureComponent<Props> {
    public render() {
        const {isOpen, toggle, photo} = this.props;
        const {link, createdAt} = photo;
        return (
            <div>
                <Modal size={"lg"} centered={true} isOpen={isOpen} toggle={toggle}>
                    <ModalBody>
                        <img className={"img-fluid"} src={link} alt={createdAt} />
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default PhotoThumbnailModal;
