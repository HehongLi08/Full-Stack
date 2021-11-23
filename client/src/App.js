import './App.css';
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import FilesUploadComponent from "./components/files-upload-component";
// import axios from "axios";
import http from "./http-common";
import Config from "./config/config";



class App extends Component {

    constructor(props) {
        super(props);
        this.fileInputUpdate = this.fileInputUpdate.bind(this);
        this.submit = this.submit.bind(this);
        this.titleInputUpdate = this.titleInputUpdate.bind(this);
        this.descriptionInputUpdate = this.descriptionInputUpdate.bind(this);
        this.priceInputUpdate = this.priceInputUpdate.bind(this);
        this.fetchAllPosts = this.fetchAllPosts.bind(this);
        this.state = {
            posts: [],
            files: [],
            title: "",
            description: "",
            price: "",
            user: "",
            posted: false
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

    async submit(e) {

        var formData = new FormData();
        formData.append("title", this.state.title);
        formData.append("description", this.state.description);
        formData.append("price", this.state.price);
        formData.append("user", "cl2228@cornell.edu");
        this.state.files.forEach( i => {
            formData.append("images", i);
        });
        // formData.append("images", this.state.files);
        let fetchRes = await http.post("/post/create", formData, {});
        // console.log(fetchRes);
        await this.fetchAllPosts();
    }

    async fetchAllPosts() {
        http.get("/post/get/title")
            .then( response => {
                this.setState({
                    posts: response.data.data
                });
            });
    }

    componentDidMount() {
        console.log("testing front-end...");
        http.get("/post/get/title")
            .then( response => {
                // console.log("-----------------------------");
                // console.log(response);
                this.setState({
                    posts: response.data.data
                });
                // console.log("tag:   --------------");
                // console.log(this.state);
            });
    }



    render() {
        // const { imgUrls } = this.state;
        // console.log(imgUrls);
        const { posts } = this.state;
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








            <div>
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
            </div>

        </div>
    );
  }

}


export default App;
