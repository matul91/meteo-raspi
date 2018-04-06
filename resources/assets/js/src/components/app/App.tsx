import * as React from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import Layout from "../layout/Layout";

interface IProps {
    onTryAutoSignup: any;
    onWeatherLoad: any;
}

class App extends React.Component<IProps, null> {
    public componentDidMount(): void {
        this.props.onTryAutoSignup();
        this.props.onWeatherLoad();
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
