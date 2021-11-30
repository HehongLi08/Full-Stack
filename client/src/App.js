import './App.css';
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Link, Route, Routes, Switch} from "react-router-dom";
import http from "./http-common";
import Config from "./config/config";

import PostTestComponent from "./components/postTestPage";
import UserTestComponent from "./components/userTestPage";
import LoginComponent from "./components/login.component";
import UserServices from "./services/user.services";




class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currUser: false
    }
  }

  componentDidMount() {
    const user = UserServices.getCurrUser();
    if (user) {
      this.setState({
        currUser: true
      });
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

  }

  render() {

    return (
        <div className="App">

          <nav className="navbar navbar-expand navbar-dark bg-dark justify-content-center">
            <div className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/posts" className="nav-link">Posts</Link>
              </li>
              <li className="nav-item">
                <Link to="/login" className="nav-link">Profile</Link>
              </li>
            </div>

          </nav>

          {this.state.currUser ? (<h1>Logged In</h1>): (<h1>Not logged In</h1>)}

          <div className="main">
            {/* Define all the routes */}
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/posts" element={<PostTestComponent/>}/>
              <Route path="/login" element={<LoginComponent/>}/>
            </Routes>
          </div>
        </div>
    )
  }


}

export const Home = () => {
  return <h1>Cornell Second-hand Trading!</h1>
}
export const About = () => {
  return <div>This is the page where you put details about yourself</div>
}
export const NotFound = () => {
  return <div>This is a 404 page</div>
}


export default App;
