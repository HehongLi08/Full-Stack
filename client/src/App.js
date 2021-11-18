import './App.css';
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import FilesUploadComponent from "./components/files-upload-component";
// import axios from "axios";
import http from "./http-common";



class App extends Component {

    constructor(props) {
        super(props);

        this.getUrl = this.getUrl.bind(this);

        this.state = {
            imgUrls: [],
            // currentTutorial: null,
            // currentIndex: -1,
            // searchTitle: ""
        };
    }

    componentDidMount() {
        http.get("/files")
            .then( response => {
                this.setState({
                    imgUrls: response.data
                });
            });
    }

    async getUrl () {
        // const data = await ax.get("/files");
        // const tmp = [];
        // data.data.forEach((d) => {
        //     tmp.push(d);
        // })
        // this.setState({
        //     imgUrls: tmp
        // })
        // console.log(this.state);
    }

    render() {
        const { imgUrls } = this.state;
        console.log(imgUrls);
      return(
        <div className="App">
            <div>
                <ul className="list-group-item">
                    <img src="http://localhost:8080/files/1636909463176-cl2228-sample.jpg" width="30%" alt={""}/>
                    {imgUrls && imgUrls.map((url, i) => (
                        <li>
                            <img src={url.url}  alt={url.name} width="10%"/>
                        </li>
                        ))
                    }
                </ul>
            </div>
          <FilesUploadComponent />
        </div>
    );
  }

}


export default App;
