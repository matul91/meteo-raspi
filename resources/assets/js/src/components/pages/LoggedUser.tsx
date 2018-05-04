import PhotosHistory from "components/photosHistory/PhotosHistory";
import * as localStorageKeys from "config/constants/localStorage";
import * as React from "react";
import { Col, PageHeader, Row } from "react-bootstrap";
import axios from "services/axios";
import firebase from "services/fcm/firebase";

interface IState {
    userToken: string;
    isSubscribed: boolean;
}

class LoggedUser extends React.Component<null, IState> {
    public state = {
        isSubscribed: false,
        userToken: localStorage.getItem(localStorageKeys.FIREBASE_TOKEN),
    };

    public componentDidMount(): void {
        this.setState({
            isSubscribed: this.state.userToken !== null,
        });
        try {
            this.subscribeUser();
        } catch (err) {
            console.log(err);
        }
    }

    public render(): JSX.Element {
        return (
            <Row>
                <Col xs={12}>
                    <PageHeader>
                        User's page
                    </PageHeader>
                    <Row>
                        <Col sm={12}>
                            <PhotosHistory/>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }

    private subscribeUser(): void {
        const messaging = firebase.messaging();
        messaging.requestPermission()
            .then(() => messaging.getToken())
            .then((token) => {
                this.updateSubscriptionOnServer(token);
                this.setState({
                    isSubscribed: true,
                    userToken: token,
                });
                localStorage.setItem(localStorageKeys.FIREBASE_TOKEN, token);
            })
            .catch((err) => console.log(err));
    }

    private updateSubscriptionOnServer(token: any) {
        axios().post("token", { FCMToken: token })
            .then()
            .catch((error) => console.log(error));
    }
}

export default LoggedUser;
