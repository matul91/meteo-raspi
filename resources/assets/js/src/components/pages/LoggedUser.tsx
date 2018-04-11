import * as firebase from "firebase";
import * as React from "react";
import {Col, PageHeader, Row} from "react-bootstrap";
import PhotosHistory from "../photosHistory/PhotosHistory";

interface IState {
    config: any;
    userToken: string;
    isSubscribed: boolean;
}

class LoggedUser extends React.Component<null, IState> {
    public state = {
        config: {
            apiKey: process.env.MIX_FIREBASE_API_KEY,
            authDomain: process.env.MIX_FIREBASE_AUTH_DOMAIN,
            databaseURL: process.env.MIX_FIREBASE_DATABASE_URL,
            messagingSenderId: process.env.MIX_FIREBASE_MESSAGING_SENDER_ID,
            projectId: process.env.MIX_FIREBASE_PROJECT_ID,
            storageBucket: process.env.MIX_FIREBASE_STORAGE_BUCKET,
        },
        isSubscribed: false,
        userToken: localStorage.getItem("pushToken"),
    };

    public componentDidMount(): void {
        this.setState({
            isSubscribed: this.state.userToken !== null,
        });
        firebase.initializeApp(this.state.config);
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
        messaging.usePublicVapidKey(process.env.MIX_FIREBASE_VAPID_KEY);
        messaging.requestPermission()
            .then(() => messaging.getToken())
            .then((token) => {
                this.updateSubscriptionOnServer(token);
                this.setState({
                    isSubscribed: true,
                    userToken: token,
                });
                localStorage.setItem("pushToken", token);
            })
            .catch((err) => console.log("Denied", err));
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
                        return console.log("Device already registered.");
                    }

                });

                if (!deviceExists) {
                    console.log("Device subscribed");
                    return database.ref("device_ids").push(token);
                }
            });
    }
}

export default LoggedUser;
