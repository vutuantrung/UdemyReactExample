import React, { Component } from 'react';
import Button from '../../components/UI/Button/Button';
import Input from '../../components/UI/Input/Input';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './Auth.module.css';
import * as action from '../../store/actions/index';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { updateObject, checkValidity } from '../../shared/utility';

class Auth extends Component {

    // We will not use Redux here because the state in redux will be lost when we refresh the app.
    // So, we will use the LocalStorage
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Your Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 7,
                },
                valid: false,
                touched: false,
            },
        },
        isSignUp: true,
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControlsForm = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(
                    event.target.value,
                    this.state.controls[controlName].validation
                ),
                touched: true,
            })
        });

        this.setState({ controls: updatedControlsForm });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(
            this.state.controls.email.value,
            this.state.controls.password.value,
            this.state.isSignUp,
        );
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return { isSignUp: !prevState.isSignUp }
        })
    }

    componentDidMount() {
        // Redirect if user do not build burger
        if (this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.onSetAuthRedirectPath();
        }
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = (
            <form onSubmit={this.submitHandler}>
                {formElementsArray.map((formElem) => {
                    return (
                        <Input
                            key={formElem.id}
                            elementConfig={formElem.config.elementConfig}
                            elementType={formElem.config.elementType}
                            value={formElem.config.value}
                            invalid={!formElem.config.valid}
                            shouldValidate={formElem.config.validation}
                            touched={formElem.config.touched}
                            changed={(event) => this.inputChangedHandler(event, formElem.id)}
                        />
                    )
                })}
                <Button btnType="Success">SUBMIT</Button>
            </form>

        );

        if (this.props.loading) {
            form = <Spinner />;
        }

        let errorMesssage = null;
        if (this.props.error) {
            // We use error message from firebase
            errorMesssage = <p>{this.props.error.message}</p>
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMesssage}
                <h4>Sign in</h4>
                {form}
                <Button
                    btnType="Danger"
                    clicked={this.switchAuthModeHandler}>
                    SWITH TO {this.state.isSignUp ? 'SIGN IN' : 'SIGN UP'}
                </Button>
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(action.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(action.setAuthRedirectPath('/')),
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token != null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.redirectPath,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
