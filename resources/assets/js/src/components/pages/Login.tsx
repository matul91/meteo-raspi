import * as React from "react";
import {Button, Col, ControlLabel, Form, FormControl, FormGroup, HelpBlock, Row} from "react-bootstrap";
import {connect} from "react-redux";
import { Redirect } from "react-router-dom";
import * as AlertStyles from "../../config/constants/alertStyles";
import * as Errors from "../../config/constants/errors";
import * as validators from "../../config/validators";
import * as actions from "../../store/actions";
import Alert from "../alert/Alert";
import Loading from "../loading/Loading";

const formInputs = [
    {
        errorMessage: null,
        label: "E-mail",
        name: "email",
        placeholder: "E-mailová adresa",
        type: "email",
        validationState: null,
        validations: [validators.required],
    },
    {
        errorMessage: null,
        label: "Heslo",
        name: "password",
        placeholder: "Heslo",
        type: "password",
        validationState: null,
        validations: [validators.required],
    },
];

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
        const authRedirect = (this.props.isAuthenticated) ? <Redirect to="/" /> : null;
        let content = null;

        if (this.props.loading) {
            content = <Loading text={"Probíhá přihlašování"} />;
        } else {
            const inputs = this.getFormInputs();
            content = (
                <form onSubmit={this.submitHandler}>
                    {inputs}
                    <Button type="submit">Submit</Button>
                </form>
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
                    <FormControl
                        type={input.type}
                        name={input.name}
                        value={this.state.formValues[input.name]}
                        placeholder={input.placeholder}
                        onChange={this.inputChangeHandler}
                    />
                    <HelpBlock>{input.errorMessage}</HelpBlock>
                </FormGroup>
            );
        });
    }

    private inputChangeHandler(e: any): void {
        this.setInputProperty(e.target.name, "validationState");
        this.setInputProperty(e.target.name, "errorMessage");

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

        const error = this.validate();
        if (error) {
            this.props.authFail(Errors.NO_ALL_CREDENTIALS_FILLED);
            return;
        }

        this.props.onAuth(this.state.formValues.email, this.state.formValues.password);
    }

    private validate(): boolean {
        let hasErrors = false;
        for (const inputValue in this.state.formValues) {
            if (this.validateInput(inputValue)) {
                hasErrors = true;
            }
        }
        return hasErrors;
    }

    private validateInput(name: string): boolean {
        let isError = false;
        let error = null;
        const item = this.getFormInputIndex(name);
        for (const validation of formInputs[item].validations) {
            error = validation(this.state.formValues[name]);
        }
        if (error) {
            isError = true;
            this.setInputProperty(name, "validationState", "error");
            this.setInputProperty(name, "errorMessage", error);
        }
        return isError;
    }

    private setInputProperty(input, property, value = null): void {
        const index = this.getFormInputIndex(input);
        formInputs[index][property] = value;
    }

    private getFormInputIndex(name: string): number {
        return formInputs.findIndex((input) => {
            return input.name === name;
        });
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
