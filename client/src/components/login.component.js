import { Component } from "react";

import UserServices from "../services/user.services";
import PostServices from "../services/post.services";
import UtilsServices from "../services/utils.services";
import getJWTHeader from "../services/jwtHeader.services";
import {Link} from "react-router-dom";



class LoginComponent extends Component {

    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
        this.fetchProfile = this.fetchProfile.bind(this);

        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeLoginUsername = this.onChangeLoginUsername.bind(this);
        this.onChangeLoginPassword = this.onChangeLoginPassword.bind(this);

        this.onChangeSignupUsername = this.onChangeSignupUsername.bind(this);
        this.onChangeSignupPassword = this.onChangeSignupPassword.bind(this);
        this.onChangeSignupVeriCode = this.onChangeSignupVeriCode.bind(this);
        this.handleSendVerificationCode = this.handleSendVerificationCode.bind(this);
        this.handleSignup = this.handleSignup.bind(this);

        this.state = {
            mainPageLoading: true,

            loginUsername: "",
            loginPassword: "",
            loginLoading: false,
            loginMessage: "",
            loginUsernameEmpty: true,
            loginPasswordEmpty: true,

            logged: false,

            signupUsername: "",
            signupPassword: "",
            signupMessage: "",
            signupVerificationCode: "",
            signupVeriMsg: "",
            signupUsernameEmpty: true,
            signupPasswordEmpty: true,
            signupVerificationCodeEmpty: true,
            signupLoading: false,
            signupSendVeriFrozen: false,

            user: null,
            posts: []
        };
    }

    logout() {
        UserServices.logout();
        window.location.reload();
    }

    /********************************************************************
     * Log in functions
     ********************************************************************/
    onChangeLoginUsername(e) {
        if (e.target.value) {
            this.setState({
                loginUsername: e.target.value,
                loginUsernameEmpty: false,
            });
        }
        else {
            this.setState({
                loginUsername: e.target.value,
                loginUsernameEmpty: true,
            });
        }

    }

    onChangeLoginPassword(e) {
        if (e.target.value) {
            this.setState({
                loginPassword: e.target.value,
                loginPasswordEmpty: false,
            });
        }
        else {
            this.setState({
                loginPassword: e.target.value,
                loginPasswordEmpty: true,
            })
        }

    }

    handleLogin(e) {
        e.preventDefault();

        this.setState({
            loginMessage: "",
            loginLoading: true
        });


        UserServices.login(this.state.loginUsername, this.state.loginPassword)
            .then( (res) => {
                this.setState({
                    loginLoading: false,
                    loginMessage: "",
                    logged: true
                });

                UtilsServices.sleep(2000)
                    .then(() => {
                        console.log(localStorage);
                        console.log("awake!");
                        this.props.history.push("/");
                        window.location.reload();
                    });








                // this.fetchProfile();
            })
            .catch((error) => {

                // this.logout();
                const errMsg =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message || error.toString();
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
        if (e.target.value) {
            this.setState({
                signupUsername: e.target.value,
                signupUsernameEmpty: false,
            });
        }
        else {
            this.setState({
                signupUsername: e.target.value,
                signupUsernameEmpty: true,
            });
        }
    }

    onChangeSignupPassword(e) {
        if (e.target.value) {
            this.setState({
                signupPassword: e.target.value,
                signupPasswordEmpty: false,
            });
        }
        else {
            this.setState({
                signupPassword: e.target.value,
                signupPasswordEmpty: true,
            });
        }
    }

    onChangeSignupVeriCode(e) {
        if (e.target.value) {
            this.setState({
                signupVerificationCode: e.target.value,
                signupVerificationCodeEmpty: false,
            });
        }
        else {
            this.setState({
                signupVerificationCode: e.target.value,
                signupVerificationCodeEmpty: true,
            });
        }
    }

    handleSendVerificationCode(e) {
        e.preventDefault();

        this.setState({
            signupMessage: "",
            signupVeriMsg: "",
            signupSendVeriFrozen: true
        });

        UserServices.signupSendVeriCode(this.state.signupUsername)
            .then( res => {
                this.setState({
                    signupVeriMsg: res.data.message,
                    signupSendVeriFrozen: false,
                    signupMessage: "",
                })
            })
            .catch( error => {

                const errMsg =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message || error.toString();

                this.setState({
                    signupVeriMsg: "",
                    signupSendVeriFrozen: false,
                    signupMessage: errMsg
                })
            });

    }

    handleSignup(e) {
        e.preventDefault();

        this.setState({
            signupMessage: "",
            signupLoading: true
        });

        // this.signupForm.validateAll();
        //
        // if (this.signupCheckBtn.context._errors.length > 0) {
        //     this.setState({
        //         signupLoading: false
        //     });
        //     return;
        // }

        UserServices.signup(this.state.signupUsername, this.state.signupPassword, this.state.signupVerificationCode)
            .then((res) => {

                console.log(res);


                this.setState({
                    user: res.data,
                    signupMessage: "",
                });
                UserServices.login(this.state.signupUsername, this.state.signupPassword)
                    .then((res) => {
                        // this.setState({
                        //     signupMessage: "",
                        //     signupLoading: "",
                        //     logged: true,
                        // });
                        this.props.history.push("/profile");
                        window.location.reload();
                    })
                    .catch((error) => {
                        // this.logout();
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
     * Fetch user data
     ********************************************************************/

    componentDidMount() {
        if (localStorage.getItem("user") === null) {
            this.setState({
                mainPageLoading: false,
                logged: false
            });
        }
        else {
            this.setState({
                mainPageLoading: false,
                logged: true
            });
        }
        this.fetchProfile();
    }

    fetchProfile() {
        PostServices.getProfilePage(getJWTHeader())
            .then((res) => {
                this.setState({
                    user: res.data.user,
                    posts: res.data.posts
                });
            })
            .catch((error) => {
                this.setState({
                    logged: false
                });
            })
    }


    render() {
        return (

            <div className="col-md-12">
                {this.state.logged ? (
                    <div>
                        <h3>logged in, redirecting you to your profile...</h3>
                    </div>
                ) : (
                    <div>
                        <p>Please Log in</p>
                        <div className="card card-container">
                            <form>
                                <h5>Log in</h5>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type={"text"}
                                        className="form-control"
                                        name="loginUserName"
                                        value={this.state.loginUsername}
                                        onChange={this.onChangeLoginUsername}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="username">Password</label>
                                    <input
                                        type={"password"}
                                        className="form-control"
                                        name="loginUserName"
                                        value={this.state.loginPassword}
                                        onChange={this.onChangeLoginPassword}
                                    />
                                </div>
                                <button
                                    className="btn btn-primary btn-block"
                                    disabled={this.state.loginLoading ||
                                    this.state.loginUsernameEmpty ||
                                    this.state.loginPasswordEmpty}
                                    onClick={this.handleLogin}
                                >
                                    {this.state.loginLoading && (
                                        <span className="spinner-border spinner-border-sm"></span>
                                    )}
                                    <span>Log in</span>
                                </button>
                                <Link to="/account/retrieve">
                                    <button
                                        className="btn btn-outline-secondary"
                                    >
                                        Forgot password
                                    </button>
                                </Link>
                                {this.state.loginMessage && (
                                    <div className="form-group">
                                        <div className="alert alert-danger" role="alert">
                                            {this.state.loginMessage}
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>
                        <label></label>
                        <div className="card card-container">
                            <form>
                                <h5>Sign up</h5>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        type={"text"}
                                        className="form-control"
                                        name="signupUsername"
                                        value={this.state.signupUsername}
                                        onChange={this.onChangeSignupUsername}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type={"password"}
                                        className="form-control"
                                        name="signupPassword"
                                        value={this.state.signupPassword}
                                        onChange={this.onChangeSignupPassword}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="verificationCode">Verification code</label>
                                    <input
                                        type={"text"}
                                        className="form-control"
                                        name="signupVerificationCode"
                                        value={this.state.signupVerificationCode}
                                        onChange={this.onChangeSignupVeriCode}
                                    />
                                    {this.state.signupVeriMsg && (
                                        <div className="form-group">
                                            <div className="alert-success" role="alert">
                                                {this.state.signupVeriMsg}
                                            </div>
                                        </div>
                                    )}
                                    <button
                                        className="btn-sm"
                                        disabled={this.state.signupLoading ||
                                        this.state.signupUsernameEmpty ||
                                        this.state.signupSendVeriFrozen }
                                        onClick={this.handleSendVerificationCode}
                                    >
                                        {this.state.signupSendVeriFrozen && (
                                            <span className="spinner-border spinner-border-sm"></span>
                                        )}
                                        <span>Get Verification Code</span>
                                    </button>
                                </div>
                                <button
                                    className="btn btn-primary btn-block"
                                    disabled={this.state.signupLoading ||
                                    this.state.signupUsernameEmpty ||
                                    this.state.signupPasswordEmpty ||
                                    this.state.signupVerificationCodeEmpty}
                                    onClick={this.handleSignup}
                                >
                                    {this.state.signupLoading && (
                                        <span className="spinner-border spinner-border-sm"></span>
                                    )}
                                    <span>Sign up</span>
                                </button>
                                {this.state.signupMessage && (
                                    <div className="form-group">
                                        <div className="alert alert-danger" role="alert">
                                            {this.state.signupMessage}
                                        </div>
                                    </div>
                                )}
                            </form>
                        </div>
                    </div>
                )}



            </div>
        )
    }
}


export const T1 = () => {
    return <h1>T1</h1>
}
export const T2 = () => {
    return <div>T2</div>
}
export const T3 = () => {
    return <div>T3</div>
}

export default LoginComponent;