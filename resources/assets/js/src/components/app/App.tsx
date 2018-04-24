import Layout from "components/layout/Layout";
import * as React from "react";
import { connect } from "react-redux";
import firebase from "services/fcm/firebase";
import * as actions from "store/actions";

interface IProps {
    onTryAutoSignup: any;
    onWeatherLoad: any;
}

class App extends React.Component<IProps, null> {
    public componentDidMount(): void {
        this.props.onTryAutoSignup();
        this.props.onWeatherLoad();
        try {
            const messaging = firebase.messaging();
            messaging.onMessage((payload: any) => {
                console.log("Notification recieved", payload);
            });
        } catch (err) {
            console.log(err);
        }
    }

    public render(): JSX.Element {
        return (
            <Layout />
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onTryAutoSignup: () => dispatch(actions.authCheckState()),
        onWeatherLoad: () => dispatch(actions.weatherLoad()),
    };
};

export default connect(null, mapDispatchToProps)(App);
