import { Component } from "react";
import {Link, useParams} from "react-router-dom";
import UserServices from "../services/user.services";
import PostServices from "../services/post.services";
import getJWTHeader from "../services/jwtHeader.services";
import Config from "../config/config";

class PostDetailComponent extends Component {

    constructor(props) {
        super(props);

        this.verifyUser = this.verifyUser.bind(this);
        this.logout = this.logout.bind(this);
        this.fetchPost = this.fetchPost.bind(this);
        this.enterLoginMode = this.enterLoginMode.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangePrice = this.onChangePrice.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeImages = this.onChangeImages.bind(this);
        this.handleSubmitUpdate = this.handleSubmitUpdate.bind(this);
        this.exitEditMode = this.exitEditMode.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

        this.state = {

            loading: true,
            logged: false,
            contentFound: false,

            post: undefined,
            owner: false,
            user: undefined,

            editMode: false,

            editPostId: "",
            editTitle: "",
            editDescription: "",
            editPrice: "",
            editImages: [],
            imgPreviewUrls: [],
            submitLoading: false,

            errMsg: "",
        }
    }

    logout() {
        UserServices.logout();
    }

    verifyUser() {
        return UserServices.verifyUser(getJWTHeader())
            .then((res) => {
                this.setState({
                    logged: true,
                    user: res.data.user
                });
            })
            .catch((error) => {
                const errMsg =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message || error.toString();

                this.logout();

                this.setState({
                    user: undefined,
                    errMsg: "Please Log in (again)",
                    logged: false,
                    contentFound: false,
                });
            })
    }

    enterLoginMode() {
        this.setState({
            editPostId: this.state.post._id,
            editTitle: this.state.post.title,
            editDescription: this.state.post.description,
            editPrice: this.state.post.price,

            editMode: true,
        })
    }

    handleDelete(e) {
        e.preventDefault();

        this.setState({
            errMsg: "",
            loading: true,
        })
        console.log("delete??");
        console.log(this.state);
        PostServices.deletePostById(this.state.post._id)
            .then((res) => {
                window.location.reload();
            })
            .catch((error) => {
                const errMsg =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message || error.toString();
                this.setState({
                    errMsg: errMsg,
                    loading: false,
                })
            })
    }

    /**
     * fetch the post when loading the page
     * @param postId
     */
    fetchPost(postId) {
        PostServices.getPostById(postId)
            .then((res) => {
                this.setState({
                    loading: false,
                    contentFound: true,
                    post: res.data.data,
                    owner: this.state.user.username === res.data.data.user
                });
                console.log(this.state);
            })
            .catch((error) => {
                this.setState({
                    loading: false,
                    contentFound: false,
                })
            })
    }


    /********************************************************************
     * Edit the post
     ********************************************************************/
    onChangeTitle(e) {
        this.setState({
            editTitle: e.target.value
        })
    }

    onChangeDescription(e) {
        this.setState({
            editDescription: e.target.value
        })
    }

    onChangePrice(e) {
        this.setState({
            editPrice: e.target.value
        })
    }

    onChangeImages(e) {
        let fileObj = Object.values(e.target.files);
        let imgPreviewUrls = [];

        fileObj.forEach( (f) => {
            imgPreviewUrls.push(URL.createObjectURL(f));
        });

        this.setState({
            editImages: fileObj,
            imgPreviewUrls: imgPreviewUrls
        });

        console.log(this.state);
    }

    exitEditMode(e) {
        e.preventDefault();
        this.setState({
            editMode: false,

            editPostId: "",
            editTitle: "",
            editDescription: "",
            editPrice: "",
            editImages: [],
            imgPreviewUrls: [],
        })
    }

    handleSubmitUpdate(e) {
        e.preventDefault();

        this.setState({
            loading: true,
        })

        let formData = new FormData();
        formData.append("title", this.state.editTitle);
        formData.append("description", this.state.editDescription);
        formData.append("price", this.state.editPrice);
        formData.append("user", this.state.user.username);
        this.state.editImages.forEach( img => {
            formData.append("images", img);
        });



        PostServices.updatePost(this.state.editPostId, formData)
            .then((res) => {
                window.location.reload();
            })
            .catch((error) => {
                const errMsg =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message || error.toString();
                this.setState({
                    errMsg: errMsg,
                    loading: false,
                })
            })
    }





    componentDidMount() {
        let postId = this.props.match.params.id;
        this.verifyUser()
            .then(() => {
                this.fetchPost(postId);
            })
    }

    render() {
        const { post , owner, editMode, errMsg, imgPreviewUrls, loading} = this.state;
        return(
            <div className="main-div">

                {!this.state.loading ? (
                    <div>
                        {this.state.logged ? (
                            // login successfully------------------------------------------------------
                            <div>
                                {this.state.contentFound ? (
                                    // content found---------------------------------------------------
                                    <div>
                                        {!editMode ? (
                                            // visitor mode here---------------------------------------
                                            <div className="card-container">
                                                <h5>{"Title: " + post.title}</h5>
                                                <p>{"Description: " + post.description}</p>
                                                <p>{"Price: " + post.price}</p>
                                                <p>{"Seller: " + post.user}</p>
                                                <p>{"Last modified at: " + post.updatedAt}</p>
                                                {post.images && post.images.map( img => (
                                                    <img src={Config.baseUrl + Config.imgGetRoute + img} key={img} width="80%"/>
                                                ))}


                                                {owner && (
                                                    <div>
                                                        <button className="btn-outline-success" onClick={this.enterLoginMode}>
                                                            Edit
                                                        </button>
                                                        <button className="btn-outline-danger" onClick={this.handleDelete}>
                                                            Delete
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        ) : (
                                            // edit mode here-----------------------------------------
                                            <div>
                                                <div className="card-container">
                                                    <form>
                                                        Title: <input type="text" onChange={this.onChangeTitle} value={this.state.editTitle}/>
                                                        <br/>
                                                        Description: <input type="text" onChange={this.onChangeDescription} value={this.state.editDescription}/>
                                                        <br/>
                                                        Price: <input type="text" onChange={this.onChangePrice} value={this.state.editPrice}/>
                                                        <br/>
                                                        Photos: <input type="file" onChange={this.onChangeImages} multiple/>
                                                        <br/>
                                                        <button className="btn-close-white" onClick={this.exitEditMode} disabled={loading}>
                                                            Cancel
                                                        </button>
                                                        <button className="btn-success" onClick={this.handleSubmitUpdate} disabled={loading}>
                                                            Submit
                                                        </button>
                                                    </form>
                                                    {errMsg && (
                                                        <div className="form-group">
                                                            <div className="alert alert-danger" role="alert">
                                                                {errMsg}
                                                            </div>
                                                        </div>
                                                    )}
                                                    {imgPreviewUrls && imgPreviewUrls.map( (srcUrl) => (
                                                        <img src={srcUrl} width="40%"/>
                                                    ))}

                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    // content not found----------------------------------------------
                                    <div>
                                        <a href="/"> content not found, it may be deleted, click to the main page</a>
                                    </div>
                                )}
                            </div>
                        ):(
                            // login failed-----------------------------------------------------------
                            <div>
                                <h4>Please login to see the detail of the post</h4>
                                <Link to="/login">
                                    <button>
                                        Log in / Sign up
                                    </button>
                                </Link>
                            </div>
                        )}
                    </div>
                ) : (
                    <div>
                        <h3>Fetching...</h3>
                    </div>
                )}



            </div>
        );
    }

}

export default PostDetailComponent;