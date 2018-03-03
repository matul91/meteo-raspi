import * as React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../store/actions/index";

interface IProps {
    onLogout: any;
}

class Logout extends React.Component<IProps, null> {
    public componentDidMount(): void {
        this.props.onLogout();
    }

    public render(): JSX.Element {
        return <Redirect to="/"/>;
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onLogout: () => dispatch(actions.logout()),
    };
};

export default connect(null, mapDispatchToProps)(Logout);
