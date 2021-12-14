import './App.css';
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {Link, Route, Switch} from "react-router-dom";
import Container from 'react-bootstrap/Container'
// import Config from "./config/config";

import LoginComponent from "./components/login.component";
import MainPageComponent from "./components/mainPage.component";
import PostDetailComponent from "./components/post.detail.component";
import ProfileComponent from "./components/profile.component";
import NewPostComponent from "./components/new.post.component";
import RetrieveAccountComponent from "./components/retrieveAccount.component";

import UserServices from "./services/user.services";
import PostServices from "./services/post.services";
import getJWTHeader from "./services/jwtHeader.services";
import {Col, Image, Row} from "react-bootstrap";




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
            {/*<div>*/}
            {/*    <div>*/}
            {/*        <Image src="./cornell-logo.png" width="60px" fluid/>*/}
            {/*    </div>*/}
            {/*</div>*/}
          {/*<Container fluid="md">*/}
          {/*    <Row>*/}
          {/*        <Col lg="4">*/}
          {/*            <Image src="./cornell-logo.png" width="20%" fluid/>*/}
          {/*        </Col>*/}
          {/*        <Col lg="8"><h1>Cornell Second-hand Mall</h1></Col>*/}
          {/*    </Row>*/}


          {/*</Container>*/}

          <div>
              <h1>Cornell Second-hand Shopping Mall</h1>
          </div>

          <nav className="navbar navbar-expand navbar-light bg-light justify-content-center">
            <div className="navbar-nav mr-auto">

                <a class="navbar-brand" href="/">
                    Home
                </a>

                <ul className="navbar-nav">
                    {/*<li className="nav-item">*/}
                    {/*    <Link to="/" className="nav-link">Home</Link>*/}
                    {/*</li>*/}


                    <li className="nav-item">
                        <Link to="/newpost" className="nav-link">New Post</Link>
                    </li>

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
                </ul>


            </div>

          </nav>

          {/*{this.state.currUser ? (<h1>Logged In</h1>): (<h1>Not logged In</h1>)}*/}

          <div className="main">
            {/* Define all the routes */}
            <Switch>
              <Route exact path="/" component={MainPageComponent} />
              <Route path="/login" component={LoginComponent} />
              <Route path="/post/:id" component={PostDetailComponent} />
              <Route path="/profile" component={ProfileComponent} />
              <Route path="/newpost" component={NewPostComponent} />
              <Route path="/account/retrieve" component={RetrieveAccountComponent} />
            </Switch>
          </div>
        </div>
    )
  }


}


export default App;
