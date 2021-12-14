import { Component } from "react";
import Config from "../config/config";
// import UserServices from "../services/user.services";
import PostServices from "../services/post.services";
import {Link} from "react-router-dom";
import {FormControl, InputGroup} from "react-bootstrap";


class MainPageComponent extends Component {


    constructor(props) {
        super(props);

        this.fetchPostByTitle = this.fetchPostByTitle.bind(this);
        this.searchTitleOnchange = this.searchTitleOnchange.bind(this);
        this.onClickSearch = this.onClickSearch.bind(this);

        this.state = {
            posts: [],
            searchTitle: "",
        }
    }

    searchTitleOnchange(e) {
        this.setState({
            searchTitle: e.target.value
        });
    }

    fetchPostByTitle() {
        PostServices.getPostsByTitle(this.state.searchTitle)
            .then( response => {
                this.setState({
                    posts: response.data.data
                });
            });
    }

    onClickSearch(e) {
        e.preventDefault();
        this.fetchPostByTitle();
    }

    componentDidMount() {
        this.fetchPostByTitle();
    }


    render() {
        const { posts } = this.state;
        return (
            <div>
                {/*<div>*/}
                {/*    <h1>*/}
                {/*        Main Page*/}
                {/*    </h1>*/}
                {/*</div>*/}


                <div className="main-page-input-box">
                    <form>
                        <InputGroup className="mb-lg-3">
                            <InputGroup.Text>
                                Find something you want:
                            </InputGroup.Text>
                            <FormControl
                                placeholder="Item Name"
                                onChange={this.searchTitleOnchange}
                                value={this.state.searchTitle}
                            />
                            <button className="btn btn-outline-primary btn-block" onClick={this.onClickSearch}>
                                Search
                            </button>
                        </InputGroup>
                    </form>
                </div>



                <div>
                    {posts.length !== 0 ? (
                        <div>
                            <div className="main-page-content-container">
                                {posts && posts.map( (p, i) => (
                                    <div className="card main-page-content-card">
                                        {p.images &&
                                        <img
                                            className="card-img-top main-page-content-img"
                                            alt={p.images[0]}
                                            src={Config.baseUrl + Config.imgGetRoute + p.images[0]}
                                        />}

                                        <div className="card-body">
                                            <Link to={"/post/" + p._id}>
                                                <h5>{p.title}</h5>
                                            </Link>
                                            <p>{"Price: " + p.price}</p>
                                            <p>{"Description: " + p.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div>
                                {posts && (
                                    <p>{posts.length + " item(s) found."}</p>
                                )}
                            </div>

                        </div>

                    ) : (
                        <div className="main-page-alert">
                            <h4>No Content Found</h4>
                        </div>
                    )}
                </div>
            </div>

        )
    }
}


export default MainPageComponent