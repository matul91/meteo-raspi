import * as React from 'react';

class Login extends React.Component {
    public state = {
        formValues: {
            name: '',
            password: '',
            rememberMe: false,
        },
    };

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    public render(): JSX.Element {
        return (
            <div className='col-xs-12'>
                <form onSubmit={this.handleSubmit}>
                    <div className='form-group'>
                        <label htmlFor='name'>Name</label>
                        <input
                            type='text'
                            defaultValue={this.state.formValues.name}
                            name='name'
                            className='form-control'
                            onChange={this.handleChange}
                            placeholder='Username'
                        />
                    </div>
                    <div className='form-group'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            defaultValue={this.state.formValues.password}
                            name='password'
                            className='form-control'
                            onChange={this.handleChange}
                            placeholder='Your password'
                        />
                    </div>
                    <div className='form-check'>
                        <label className='form-check-label'>
                            <input
                                type='checkbox'
                                name='rememberMe'
                                className='form-check-input'
                                onChange={this.handleChange}
                                checked={this.state.formValues.rememberMe}
                            />
                             Remember me
                        </label>
                    </div>
                    <button type='submit' className='btn btn-primary'>Submit</button>
                </form>
            </div>
        );
    }

    private handleChange(e: any): void {
        const value = (e.target.type === 'checkbox') ? e.target.checked : e.target.value;

        this.setState({
            ...this.state,
            formValues: {
                ...this.state.formValues,
                [e.target.name]: value,
            },
        });
    }

    private handleSubmit(e: any): void {
        e.preventDefault();
        console.log(this.state.formValues);
    }
}

export default Login;
