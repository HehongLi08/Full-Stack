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
        this.state = {
            posts: []
        };
    }

    componentDidMount() {
        http.get("/post/get/all")
            .then( response => {
                console.log("-----------------------------");
                console.log(response);
                this.setState({
                    posts: response.data.data
                });
                console.log("tag:   --------------");
                console.log(this.state);
            });
    }



    render() {
        // const { imgUrls } = this.state;
        // console.log(imgUrls);
        const { posts } = this.state;
        console.log(this.state);
      return(
        <div className="App">
            <h1>Testing page for image uploading/retrieving</h1>
            <FilesUploadComponent />
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
