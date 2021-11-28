import './App.css';
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Link, Route, Routes, Switch} from "react-router-dom";
// import FilesUploadComponent from "./components/files-upload-component";
// import axios from "axios";
import http from "./http-common";
import Config from "./config/config";

import PostTestComponent from "./components/postTestPage";
import UserTestComponent from "./components/userTestPage";



class App extends Component {
  render() {

    return (
        <div className="App">
          <nav className="navbar navbar-expand navbar-dark bg-dark justify-content-center">
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="posts" className="nav-link">Posts</Link>
              </li>
              <li className="nav-item">
                <Link to="about" className="nav-link">About</Link>
              </li>
            </div>


          </nav>
          <div className="main">
            {/* Define all the routes */}
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="posts" element={<PostTestComponent/>}/>
              <Route path="about" element={<NotFound/>}/>
            </Routes>
          </div>
        </div>
    )
  }


}

export const Home = () => {
  return <div>You are in Home page</div>
}
export const About = () => {
  return <div>This is the page where you put details about yourself</div>
}
export const NotFound = () => {
  return <div>This is a 404 page</div>
}


export default App;
