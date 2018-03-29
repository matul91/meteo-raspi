import * as React from "react";
import {Button, Col, ControlLabel, FormControl, FormGroup, Row} from "react-bootstrap";
import {connect} from "react-redux";
import { Redirect } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import validator from "validator";
import * as AlertStyles from "../../config/constants/alertStyles";
import * as Errors from "../../config/constants/errors";
import * as actions from "../../store/actions";
import Alert from "../alert/Alert";
import Loading from "../loading/Loading";

const required = (value) => {
    if (!value.toString().trim().length) {
        return "require";
    }
};

const email = (value) => {
    if (!validator.isEmail(value)) {
        return `${value} is not a valid email.`;
    }
};

const formInputs = [
    {
        label: "E-mail",
        name: "email",
        placeholder: "E-mailová adresa",
        type: "email",
        validationState: null,
    },
    {
        label: "Heslo",
        name: "password",
        placeholder: "Heslo",
        type: "password",
        validationState: null,
    },
];

class Login extends React.Component<any> {
    public state = {
        formValues: {
            email: "",
            password: "",
        },
    };
    private form = null;

    constructor(props) {
        super(props);
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    public render(): JSX.Element {
        const authRedirect = (this.props.isAuthenticated) ? <Redirect to="/" /> : null;
        let content = null;

        if (this.props.loading) {
            content = <Loading text={"Probíhá přihlašování"} />;
        } else {
            const inputs = this.getFormInputs();
            content = (
                <Form ref={(c) => { this.form = c; }} onSubmit={this.submitHandler}>
                    {inputs}
                    <Button type="submit">Submit</Button>
                </Form>
            );
        }

        return (
            <Row>
                <Col xs={12}>
                    {authRedirect}
                    {this.props.error && <Alert type={this.props.error} cls={AlertStyles.DANGER} />}
                    {content}
                </Col>
            </Row>
        );
    }

    private getFormInputs(): JSX.Element[] {
        return formInputs.map((input) => {
            return (
                <FormGroup
                    controlId={input.name}
                    key={input.name}
                    validationState={input.validationState}
                >
                    <ControlLabel>{input.label}</ControlLabel>
                    <Input
                        type={input.type}
                        name={input.name}
                        value={this.state.formValues[input.name]}
                        placeholder={input.placeholder}
                        onChange={this.inputChangeHandler}
                        className="form-control"
                        validations={[required, email]}
                    />
                </FormGroup>
            );
        });
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

        this.form.validateAll();
        if (!this.state.formValues.email || !this.state.formValues.password) {
            this.props.authFail(Errors.NO_ALL_CREDENTIALS_FILLED);
            return;
        }

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
        authFail: (error) => dispatch(actions.authFail(error)),
        onAuth: (email, password) => dispatch(actions.auth(email, password)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
