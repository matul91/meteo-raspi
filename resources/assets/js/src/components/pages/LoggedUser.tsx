import * as localStorageKeys from "config/constants/localStorage";
import * as React from "react";
import {Col, PageHeader, Row} from "react-bootstrap";
import firebase from "services/firebase";
import PhotosHistory from "../photosHistory/PhotosHistory";

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
        this.subscribeUser();
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
            .catch((err) => new Error(err));
    }

    private updateSubscriptionOnServer(token: any) {
        const database = firebase.database();
        if (this.state.isSubscribed) {
            return database.ref("device_ids")
                .equalTo(token)
                .on("child_added", (snapshot) => snapshot.ref.remove());
        }

        database.ref("device_ids").once("value")
            .then((snapshots) => {
                let deviceExists = false;

                snapshots.forEach((childSnapshot) => {
                    if (childSnapshot.val() === token) {
                        deviceExists = true;
                        return;
                    }
                });

                if (!deviceExists) {
                    return database.ref("device_ids").push(token);
                }
            });
    }
}

export default LoggedUser;
