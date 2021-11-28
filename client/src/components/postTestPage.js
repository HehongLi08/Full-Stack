import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import http from "../http-common";
import Config from "../config/config";
import UserServices from "../services/user.services";
import PostServices from "../services/post.services";


class PostTestComponent extends Component {
    constructor(props) {
        super(props);
        this.fileInputUpdate = this.fileInputUpdate.bind(this);
        this.submit = this.submit.bind(this);
        this.titleInputUpdate = this.titleInputUpdate.bind(this);
        this.descriptionInputUpdate = this.descriptionInputUpdate.bind(this);
        this.priceInputUpdate = this.priceInputUpdate.bind(this);
        this.fetchPostsByTitle = this.fetchPostsByTitle.bind(this);
        this.searchInputUpdate = this.searchInputUpdate.bind(this);
        this.testFunction = this.testFunction.bind(this);
        this.state = {
            posts: [],
            files: [],
            title: "",
            description: "",
            price: "",
            user: "",
            posted: false,
            searchTitle: "",
            hasError: false,
            errorMsg: '',
        };
    }


    titleInputUpdate(e) {
        this.setState({
            title: e.target.value
        });
    }

    descriptionInputUpdate(e) {
        this.setState({
            description: e.target.value
        });
    }

    priceInputUpdate(e) {
        this.setState({
            price: e.target.value
        });
    }

    userInputUpdate(e) {

    }

    fileInputUpdate(e) {
        let fileDict = e.target.files;
        let files = Object.values(fileDict);

        this.setState({
            files: files,
            test: "test"
        });
        console.log(this.state);
    }

    searchInputUpdate(e) {
        this.setState({
            searchTitle: e.target.value
        });
    }

    submit(e) {
        let formData = new FormData();
        formData.append("title", this.state.title);
        formData.append("description", this.state.description);
        formData.append("price", this.state.price);
        formData.append("user", "cl2228@cornell.edu");
        this.state.files.forEach( i => {
            formData.append("images", i);
        });

        PostServices.createPost(formData)
            .then( res => {
                this.setState({
                    searchTitle: ""
                });
                this.fetchPostsByTitle();
            })
    }

    fetchPostsByTitle() {
        PostServices.getPostsByTitle(this.state.searchTitle)
            .then( response => {
                console.log(response);
                this.setState({
                    posts: response.data.data
                });
            });
    }

    componentDidMount() {
        console.log("testing front-end...");
        this.fetchPostsByTitle();
    }


    async testFunction() {
        let formJSON = {
            username: "cl224348@cornell.edu",
            password: "mzxcnmcnm"
        };
        UserServices.login("cl2228@cornell.edu", "mzxcnmcnm1");
        // http.post("/user/signup", formJSON)
        //     .then((res) => {
        //         this.setState({
        //             errorMsg: res.data.message,
        //             hasError: false
        //         })
        //         console.log(res);
        //     })
        //     .catch((error) => {
        //         this.setState({
        //             errorMsg: error.response.data.message + ", please try again!",
        //             hasError: true
        //         })
        //         console.log(this.state);
        //     });
    }


    render() {
        // const { imgUrls } = this.state;
        // console.log(imgUrls);
        const { posts, errorMsg, hasError} = this.state;
        // console.log(this.state);
        return(
            <div className="App">
                <h1>Testing page for Item posting and retrieving</h1>
                {/*<FilesUploadComponent />*/}

                <div className="upload-test">
                    {/*<form>*/}

                    Title: <input type="text" onChange={this.titleInputUpdate} className="input-title"/>
                    <br/>
                    Description: <input type="text" onChange={this.descriptionInputUpdate} className="input-description"/>
                    <br/>
                    Price: <input type="text" onChange={this.priceInputUpdate} className="input-price"/>
                    <br/>
                    Photos: <input type="file" onChange={this.fileInputUpdate} multiple/>
                    <br/>
                    <button className="btn-primary" onClick={this.submit}>
                        Upload
                    </button>
                    {/*</form>*/}

                </div>
                <br/>
                <br/>
                {/*an input window for searching the title!*/}
                <div>
                    Search Title: <input type="text" onChange={this.searchInputUpdate} className="input-group-lg input-search" />
                    <button className="btn-primary" onClick={this.fetchPostsByTitle}>
                        Search
                    </button>
                    <br/>
                    <br/>


                    <button className="btn-primary" onClick={this.testFunction}>
                        Login
                    </button>
                    <button className="btn-primary" onClick={UserServices.logout}>
                        Logout
                    </button>
                    {errorMsg && <span>{errorMsg}</span>}
                </div>


                <div>
                    {posts.length === 0 ? (<p>No Content Found</p>) :
                        (
                            <ul className="list-group-item">
                                {posts && posts.map( (p, i) => (
                                    <li>
                                        <h5>{"Title: " + p.title}</h5>
                                        <p>{"Price: " + p.price}</p>
                                        <p>{"Description: " + p.description}</p>
                                        <p>{"Seller: " + p.user}</p>
                                        {p.images && p.images.map( img => (
                                            <img src={Config.baseUrl + Config.imgGetRoute + img} alt={img} width="10%" />
                                        ))}
                                        <br/>
                                        -------------------------------------------------------
                                        <br/>

                                    </li>
                                ))
                                }

                            </ul>
                        )
                    }

                </div>

            </div>
        );
    }
}

export default PostTestComponent;