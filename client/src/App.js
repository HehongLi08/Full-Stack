import './App.css';
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import Config from "./config/config";

import PostTestComponent from "./components/postTestPage";
import UserTestComponent from "./components/userTestPage";
import LoginComponent from "./components/login.component";
import MainPageComponent from "./components/mainPage.component";
import PostDetailComponent from "./components/post.detail.component";
import ProfileComponent from "./components/profile.component";
import NewPostComponent from "./components/new.post.component";

import UserServices from "./services/user.services";
import PostServices from "./services/post.services";
import getJWTHeader from "./services/jwtHeader.services";




class App extends Component {
  constructor(props) {
    super(props);

    this.logout = this.logout.bind(this);

    this.state = {
      currUser: false
    }
  }

  /**
   * Log out, deleting the user information in the local storage and reload the page
   */
  logout() {
    UserServices.logout();
    window.location.reload();
  }

  /**
   * validate if the token is still valid and keep the page logged in
   */
  validateUser() {
    PostServices.getProfilePage(getJWTHeader())
        .then(() => {
          this.setState({
            currUser: true
          });
        })
        .catch((error) => {
          UserServices.logout();
          this.setState({
            currUser: false
          })
        })

  }


  componentDidMount() {
    const user = UserServices.getCurrUser();
    if (user) {
      this.validateUser();
    }
    else {
      this.setState({
        currUser: false,
      })
    }
  }


  render() {
    const { currUser } = this.state;
    return (
        <div className="App">

          <nav className="navbar navbar-expand navbar-dark bg-dark justify-content-center">
            <div className="navbar-nav mr-auto">

              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>

              {/*<li className="nav-item">*/}
              {/*  <Link to="/posts" className="nav-link">Posts</Link>*/}
              {/*</li>*/}


              {/*{currUser && (*/}
                  <li className="nav-item">
                    <Link to="/newpost" className="nav-link">New Post</Link>
                  </li>
              {/*)}*/}

              {!currUser && (
                  <li className="nav-item">
                    <Link to="/login" className="nav-link">Login/Signup</Link>
                  </li>
              )}

              {currUser && (
                  <li className="nav-item">
                    <Link to="/profile" className="nav-link">My Page</Link>
                  </li>
              )}

              {currUser && (
                  <li className="nav-item">
                    <a href="/" onClick={this.logout} className="nav-link">
                      Logout
                    </a>
                  </li>
              )}

            </div>

          </nav>

          {/*{this.state.currUser ? (<h1>Logged In</h1>): (<h1>Not logged In</h1>)}*/}

          <div className="main">
            {/* Define all the routes */}
            <Switch>
              <Route exact path="/" component={MainPageComponent} />
              <Route path="/posts" component={PostTestComponent} />
              <Route path="/login" component={LoginComponent} />
              <Route path="/post/:id" component={PostDetailComponent} />
              <Route path="/profile" component={ProfileComponent} />
              <Route path="/newpost" component={NewPostComponent} />
            </Switch>
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
