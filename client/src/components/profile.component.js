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
                console.log(error.response);
                // const errMsg =
                //     (error.response &&
                //         error.response.data &&
                //         error.response.data.message) ||
                //     error.message || error.toString();


                // this.logout();
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
        console.log(localStorage);
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
                                <div className="card card-container">
                                    <span>{"Username: " + user.username}</span>
                                    <span>{"ID: " + user._id}</span>
                                    <button className="btn-primary" onClick={this.logout}>Log out</button>
                                </div>

                                <div className="align-middle">
                                    <h5>My posts</h5>
                                    <Link to={"newpost"}>
                                        <button className="btn-primary">Post a new one!</button>
                                    </Link>
                                    {posts && posts.map( p => (
                                        <div>
                                            <div className="card card-container" key={p._id}>
                                                <Link to={"/post/" + p._id}>
                                                    {p.title}
                                                </Link>
                                                <label>{"Description: " + p.description}</label>
                                                <label>{"Last updated: " + p.updatedAt}</label>
                                                {p.images && p.images.map(img => (
                                                    <img src={Config.baseUrl + Config.imgGetRoute + img} alt={img}/>
                                                ))}
                                            </div>
                                            <p></p>
                                        </div>


                                        ))}

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