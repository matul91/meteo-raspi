import * as React from "react";
import {connect} from "react-redux";
import * as actions from "../../store/actions";

class Login extends React.Component<any> {
    public state = {
        formValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    };

    constructor(props) {
        super(props);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    public render(): JSX.Element {
        return (
            <div className="col-xs-12">
                <form onSubmit={this.submitHandler}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
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
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            defaultValue={this.state.formValues.password}
                            name="password"
                            className="form-control"
                            onChange={this.inputChangeHandler}
                            placeholder="Vaše heslo"
                        />
                    </div>
                    <div className="form-check">
                        <label className="form-check-label">
                            <input
                                type="checkbox"
                                name="rememberMe"
                                className="form-check-input"
                                onChange={this.inputChangeHandler}
                                checked={this.state.formValues.rememberMe}
                            />
                            Zapamatovat si mě
                        </label>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }

    private inputChangeHandler(e: any): void {
        const value = (e.target.type === "checkbox") ? e.target.checked : e.target.value;

        this.setState({
            ...this.state,
            formValues: {
                ...this.state.formValues,
                [e.target.name]: value,
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
