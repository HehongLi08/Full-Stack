import { Component } from "react";
import Config from "../config/config";
// import UserServices from "../services/user.services";
import PostServices from "../services/post.services";
import {Link} from "react-router-dom";


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
            <div className="list row">
                <div >
                    <h1>
                        Cornell Second-hand Trading
                    </h1>
                </div>


                <div className="align-content-center">
                    <form>
                        <span>Items: </span>
                        <input
                            value={this.state.searchTitle}
                            onChange={this.searchTitleOnchange}
                        />
                        <button className="btn-primary" onClick={this.onClickSearch}>
                            Search
                        </button>
                    </form>
                </div>


                <div>
                    {posts.length !== 0 ? (
                        <div>
                            {posts && posts.map( (p, i) => (
                                <div className="card-container" key={p._id}>
                                    <Link to={/post/ + p._id}>
                                        <div className="card-header">
                                            {"Title: " + p.title}
                                        </div>
                                    </Link>

                                    <div className="card-body">
                                        {"Price: " + p.price}
                                    </div>
                                    {p.images && p.images.map( img => (
                                        <img src={Config.baseUrl + Config.imgGetRoute + img} alt={img} width="10%" key={img} />
                                    ))}
                                </div>
                            ))}

                        </div>
                    ) : (
                        <div>
                            <h4>No Content Found</h4>
                        </div>
                    )}
                </div>
            </div>

        )
    }
}


export default MainPageComponent