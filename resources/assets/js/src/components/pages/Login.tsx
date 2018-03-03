import * as React from "react";
import {connect} from "react-redux";
import { Redirect } from "react-router-dom";
import * as actions from "../../store/actions";
import Alert from "../alert/Alert";
import Loading from "../loading/Loading";

class Login extends React.Component<any> {
    public state = {
        formValues: {
            email: "",
            password: "",
        },
    };

    constructor(props) {
        super(props);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    public render(): JSX.Element {
        let authRedirect = null;
        let content = null;

        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to="/" />;
        }

        if (this.props.loading) {
            content = <Loading text={"Probíhá přihlašování"} />;
        } else {
            content = (
                <form onSubmit={this.submitHandler}>
                    <div className="form-group">
                        <label htmlFor="name">E-mail</label>
                        <input
                            type="text"
                            defaultValue={this.state.formValues.email}
                            name="email"
                            className="form-control"
                            onChange={this.inputChangeHandler}
                            placeholder="E-mailová adresa"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Heslo</label>
                        <input
                            type="password"
                            defaultValue={this.state.formValues.password}
                            name="password"
                            className="form-control"
                            onChange={this.inputChangeHandler}
                            placeholder="Vaše heslo"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            );
        }

        return (
            <div className="col-xs-12">
                {authRedirect}
                {this.props.error && <Alert type={this.props.error} cls={"danger"} />}
                {content}
            </div>
        );
    }

    private inputChangeHandler(e: any): void {
        this.setState({
            ...this.state,
            formValues: {
                ...this.state.formValues,
                [e.target.name]: e.target.value,
            },
        });
    }

    private submitHandler(e: any): void {
        e.preventDefault();
        this.props.onAuth(this.state.formValues.email, this.state.formValues.password);
    }
}

const mapStateToProps = (state) => {
    return {
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        loading: state.auth.loading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password) => dispatch(actions.auth(email, password)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
