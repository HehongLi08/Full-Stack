import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import {Component} from "react";
import { useNavigate } from "react-router-dom";

import UserServices from "../services/user.services";
import getJWTHeader from "../services/jwtHeader.services";
import {Home} from "../App";
import PostTestComponent from "./postTestPage";

const required = function(value) {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                This field is required!
            </div>
        );
    }
}


class LoginComponent extends Component {

    constructor(props) {
        super(props);

        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeLoginUsername = this.onChangeLoginUsername.bind(this);
        this.onChangeLoginPassword = this.onChangeLoginPassword.bind(this);

        this.onChangeSignupUsername = this.onChangeSignupUsername.bind(this);
        this.onChangeSignupPassword = this.onChangeSignupPassword.bind(this);
        this.handleSignup = this.handleSignup.bind(this);

        this.state = {
            mainPageLoading: true,

            loginUsername: "",
            loginPassword: "",
            loginLoading: false,
            loginMessage: "",

            logged: false,

            signupUsername: "",
            signupPassword: "",
            signupLoading: false,
            signupMessage: "",

            user: null,
            posts: []
        };
    }

    /********************************************************************
     * Log in functions
     ********************************************************************/
    onChangeLoginUsername(e) {
        this.setState({
            loginUsername: e.target.value
        })
    }

    onChangeLoginPassword(e) {
        this.setState({
            loginPassword: e.target.value
        })
    }

    handleLogin(e) {
        e.preventDefault();

        this.setState({
            loginMessage: "",
            loginLoading: true
        });

        this.loginForm.validateAll();

        if (this.loginCheckBtn.context._errors.length > 0) {
            this.setState({
                loginLoading: false
            });
            return;
        }

        UserServices.login(this.state.loginUsername, this.state.loginPassword)
            .then( (res) => {
                this.setState({
                    loginLoading: false,
                    loginMessage: "",
                    logged: true
                });
            })
            .catch((error) => {
                UserServices.logout();
                const errMsg =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message || error.toString();
                console.log(errMsg);
                console.log(error.response);
                this.setState({
                    loginLoading: false,
                    loginMessage: errMsg
                })
            });
    }


    /********************************************************************
     * Sign up functions
     ********************************************************************/
    onChangeSignupUsername(e) {
        this.setState({
            signupUsername: e.target.value,
        });
    }

    onChangeSignupPassword(e) {
        this.setState({
            signupPassword: e.target.value,
        });
    }


    handleSignup(e) {
        e.preventDefault();

        this.setState({
            signupMessage: "",
            signupLoading: true
        });

        this.signupForm.validateAll();

        if (this.signupCheckBtn.context._errors.length > 0) {
            this.setState({
                signupLoading: false
            });
            return;
        }

        UserServices.signup(this.state.signupUsername, this.state.signupPassword)
            .then((res) => {
                this.setState({
                    user: res.data,
                    signupMessage: "",
                });
                UserServices.login(this.state.signupUsername, this.state.signupPassword)
                    .then((res) => {
                        this.setState({
                            signupMessage: "",
                            signupLoading: "",
                            logged: true,
                        });
                    })
                    .catch((error) => {
                        UserServices.logout();
                        const errMsg =
                            (error.response &&
                                error.response.data &&
                                error.response.data.message) ||
                            error.message || error.toString();
                        this.setState({
                            signupLoading: false,
                            signupMessage: errMsg,
                            logged: false,
                            user: null
                        })
                    })
            })
            .catch((error) => {
                UserServices.logout();
                const errMsg =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message || error.toString();
                this.setState({
                    signupLoading: false,
                    signupMessage: errMsg,
                    logged: false,
                    user: null
                });
                console.log(this.state);
            });
    }



    /********************************************************************
     * Sign up functions
     ********************************************************************/

    componentDidMount() {
        if (localStorage.getItem("user") === null) {
            console.log("no user!");
            this.setState({
                mainPageLoading: false,
            })
            return;
        }




        // console.log(localStorage.user);
    }


    render() {
        return (

            <div className="col-md-12">
                {this.state.logged ? (<p>Successfully logged in</p>) : (<p>Please Log in</p>)}

                {/*the form for login*/}
                <div className="card card-container">
                    <h5>Login</h5>
                    <Form
                        onSubmit={this.handleLogin}
                        ref={c => {this.loginForm = c;}}
                    >
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="username"
                                value={this.state.loginUsername}
                                onChange={this.onChangeLoginUsername}
                                validations={[required]}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Input
                                type="password"
                                className="form-control"
                                name="password"
                                value={this.state.loginPassword}
                                onChange={this.onChangeLoginPassword}
                                validations={[required]}
                            />
                        </div>
                        <div className="form-group">
                            <button
                                className="btn btn-primary btn-block"
                                disabled={this.state.loginLoading}
                            >
                                {this.state.loginLoading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Log in</span>
                            </button>
                        </div>
                        {this.state.loginMessage && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {this.state.loginMessage}
                                </div>
                            </div>
                        )}
                        <CheckButton
                            style={{ display: "none" }}
                            ref={c => {this.loginCheckBtn = c;
                            }}
                        />
                    </Form>
                </div>


                <label></label>
                <div className="card card-container">
                    <h5>Sign up</h5>
                    <Form
                        onSubmit={this.handleSignup}
                        ref={c => {this.signupForm = c;}}
                    >
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <Input
                                type="text"
                                className="form-control"
                                name="username"
                                value={this.state.signupUsername}
                                onChange={this.onChangeSignupUsername}
                                validations={[required]}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <Input
                                type="password"
                                className="form-control"
                                name="password"
                                value={this.state.signupPassword}
                                onChange={this.onChangeSignupPassword}
                                validations={[required]}
                            />
                        </div>

                        <div className="form-group">
                            <button
                                className="btn btn-primary btn-block"
                                disabled={this.state.signupLoading}
                            >
                                {this.state.signupLoading && (
                                    <span className="spinner-border spinner-border-sm"></span>
                                )}
                                <span>Sign up</span>
                            </button>
                        </div>

                        {this.state.signupMessage && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
                                    {this.state.signupMessage}
                                </div>
                            </div>
                        )}
                        <CheckButton
                            style={{ display: "none" }}
                            ref={c => {this.signupCheckBtn = c;
                            }}
                        />
                    </Form>
                </div>

            </div>
        )
    }
}

export default LoginComponent;