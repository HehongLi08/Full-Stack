import { Component } from "react";

import UserServices from "../services/user.services";
import PostServices from "../services/post.services";
import UtilsServices from "../services/utils.services";
import getJWTHeader from "../services/jwtHeader.services";
import {Link} from "react-router-dom";
import {Col, Container, Form, FormControl, InputGroup, Row} from "react-bootstrap";



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


                console.log(localStorage);
                console.log("awake!");
                this.props.history.push("/profile");
                UtilsServices.sleep(500)
                    .then(() => {
                        window.location.reload();
                    })
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


        UserServices.signup(this.state.signupUsername, this.state.signupPassword, this.state.signupVerificationCode)
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
                        this.props.history.push("/profile");
                        UtilsServices.sleep(500)
                            .then(() => {
                                window.location.reload();
                            });
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
                        <h4 className="sub-title login-page-title">Please Log in or Sign up</h4>
                        <Container>
                            <Row className="justify-content-md-center">
                                <Col md="auto">
                                    <div className="card card-container" style={{width: '100%'}}>
                                        <form>
                                            <h5>Log in</h5>
                                            <InputGroup className="mb-lg-3">
                                                <InputGroup.Text>
                                                    Username
                                                </InputGroup.Text>
                                                <FormControl
                                                    placeholder="NetID@cornell.edu"
                                                    onChange={this.onChangeLoginUsername}
                                                    value={this.state.loginUsername}
                                                />
                                            </InputGroup>
                                            <InputGroup className="mb-lg-3">
                                                <InputGroup.Text>
                                                    Password
                                                </InputGroup.Text>
                                                <FormControl
                                                    type="password"
                                                    placeholder="password"
                                                    onChange={this.onChangeLoginPassword}
                                                    value={this.state.loginPassword}
                                                />
                                            </InputGroup>

                                            <button
                                                className="btn btn-outline-primary btn-block"
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
                                </Col>


                                <Col md="auto">
                                    <div className="card card-container" style={{width: '100%'}}>
                                        <form>
                                            <h5>Sign up</h5>
                                            <InputGroup className="mb-lg-3">
                                                <InputGroup.Text>
                                                    Username
                                                </InputGroup.Text>
                                                <FormControl
                                                    placeholder="NetID@cornell.edu"
                                                    onChange={this.onChangeSignupUsername}
                                                    value={this.state.signupUsername}
                                                />
                                            </InputGroup>
                                            <InputGroup className="mb-lg-3">
                                                <InputGroup.Text>
                                                    Password
                                                </InputGroup.Text>
                                                <FormControl
                                                    type="password"
                                                    placeholder="password"
                                                    onChange={this.onChangeSignupPassword}
                                                    value={this.state.signupPassword}
                                                />

                                            </InputGroup>
                                            <InputGroup className="mb-lg-3">
                                                <InputGroup.Text>
                                                    Verification code
                                                </InputGroup.Text>
                                                <FormControl
                                                    type="text"
                                                    placeholder="Verification code"
                                                    onChange={this.onChangeSignupVeriCode}
                                                    value={this.state.signupVerificationCode}
                                                />
                                                <button
                                                    className="btn btn-outline-secondary"
                                                    onClick={this.handleSendVerificationCode}
                                                    disabled={this.state.signupLoading ||
                                                    this.state.signupUsernameEmpty ||
                                                    this.state.signupSendVeriFrozen}
                                                    >
                                                    Get code
                                                </button>
                                            </InputGroup>

                                            {this.state.signupVeriMsg && (
                                                <div className="form-group">
                                                    <div className="alert-success" role="alert">
                                                        {this.state.signupVeriMsg}
                                                    </div>
                                                </div>
                                            )}

                                            <button
                                                className="btn btn-outline-primary btn-block"
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
                                </Col>
                            </Row>

                        </Container>
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