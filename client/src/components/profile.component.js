import { Component } from "react";


import UserServices from "../services/user.services"
import PostServices from "../services/post.services";
import getJWTHeader from "../services/jwtHeader.services";
import Config from "../config/config";
import {Link} from "react-router-dom";


class ProfileComponent extends Component {




    constructor(props) {
        super(props);

        this.logout = this.logout.bind(this);
        this.verifyUser = this.verifyUser.bind(this);
        this.loadProfile = this.loadProfile.bind(this);

        this.state = {
            loading: true,
            logged: false,

            user: undefined,
            posts: [],

            errMsg: "",
        }
    }

    logout() {
        UserServices.logout();
        this.props.history.push("/login");
        window.location.reload();
    }

    // verify the existing token, check whether it is valid, if not, log out automatically
    verifyUser() {

    }

    loadProfile() {
        PostServices.getProfilePage(getJWTHeader())
            .then((res) => {
                console.log("success");
                this.setState({
                    logged: true,
                    user: res.data.user,
                    posts: res.data.posts,
                    loading: false,
                    errMsg: ""
                });
            })
            .catch((error) => {
                console.log("error:");
                console.log(error);
                // const errMsg =
                //     (error.response &&
                //         error.response.data &&
                //         error.response.data.message) ||
                //     error.message || error.toString();


                this.logout();
                this.setState({
                    loading: false,
                    user: undefined,
                    errMsg: "Please Log in (again)",
                    logged: false,
                    posts: [],
                });
            })
    }


    componentDidMount() {
        console.log("reached profile page, token:");
        console.log(getJWTHeader());
        this.loadProfile()

    }

    render() {
        const { loading, logged, user, posts } = this.state;

        return (
            <div>
                <h4>My Profile</h4>
                {!loading? (
                    // data fetch finished------------------------------------
                    <div>
                        {logged ? (
                            // logged in successfully--------------------------
                            <div>
                                <div className="profile-page-container">
                                    <div className="card card-container">
                                        <span>{"Username: " + user.username}</span>
                                        <span>{"ID: " + user._id}</span>
                                    </div>
                                    <button className="btn btn-outline-danger" onClick={this.logout}>Log out</button>

                                </div>


                                <div className="align-middle">
                                    <h5>My posts</h5>
                                    <Link to={"newpost"}>
                                        <button className="btn btn-outline-success">Post a new one!</button>
                                    </Link>

                                    <div className="main-page-content-container">
                                        {posts && posts.map( p => (
                                            <div className="card main-page-content-card">
                                                <div className="card-container" key={p._id}>
                                                    {p.images && <img
                                                        className="card-img-top main-page-content-img"
                                                        alt={p.images[0]}
                                                        src={Config.baseUrl + Config.imgGetRoute + p.images[0]}
                                                    />}
                                                    <Link to={"/post/" + p._id}>
                                                        <h5>{p.title}</h5>
                                                    </Link>
                                                    <p>{"Description: " + p.description}</p>
                                                    <p>{"Last updated: " + p.updatedAt}</p>
                                                </div>
                                                <p></p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                        ) : (
                            // not logged in-----------------------------------
                            <div>
                                <Link to="/login">
                                    <button className="btn-primary">Login / Signup</button>
                                </Link>
                            </div>
                        )}
                    </div>
                ):(
                    // still fetching data from the server--------------------
                    <div>
                        <h5>Loading...</h5>
                    </div>
                )}
            </div>
        );
    }
}


export default ProfileComponent;