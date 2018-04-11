import * as firebase from "firebase";
import * as React from "react";
import {Col, PageHeader, Row} from "react-bootstrap";
import PhotosHistory from "../photosHistory/PhotosHistory";

class LoggedUser extends React.Component {
    public componentDidMount(): void {
        const config = {
            apiKey: process.env.MIX_FIREBASE_API_KEY,
            authDomain: process.env.MIX_FIREBASE_AUTH_DOMAIN,
            databaseURL: process.env.MIX_FIREBASE_DATABASE_URL,
            messagingSenderId: process.env.MIX_FIREBASE_MESSAGING_SENDER_ID,
            projectId: process.env.MIX_FIREBASE_PROJECT_ID,
            storageBucket: process.env.MIX_FIREBASE_STORAGE_BUCKET,
        };
        firebase.initializeApp(config);
        const messaging = firebase.messaging();
        messaging.usePublicVapidKey(
            "BGBPRvOncmbGITMU8cgt7b-g4q9fQjXC8eUAueCj0kGe4D3gs1JcyBbsrYqecIGig8kP1sbhnqWva-u29gzULd8"
        );
        messaging.requestPermission()
            .then(() => messaging.getToken())
            .then((token) => {
                console.log("Granted", token);
            })
            .catch((err) => console.log("Denied", err));
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
}

export default LoggedUser;
