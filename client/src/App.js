import React, { Component } from "react";
import "./App.css";

export default class App extends Component {

    constructor(props) {
        super();
        this.state = {
            list: true,
            card: false,
            players: [],
            player: {}
        };
    }

    componentDidMount() {
        fetch("http://localhost:3001/players/list")
            .then(response => response.json())
            .then( responseJson => {
                this.setState( {players: responseJson.data});
            });
    }

    showCard=id=> {
        fetch(`http://localhost:3001/players/${id}`)
            .then(response => response.json())
            .then(
                responseJson => {
                    this.setState( {player: responseJson.data});
                    // console.log(this.state.player);
                    },
            );
        this.setState( {
            list:false,
            card: true
        });
    };

    showList = () => {
        this.setState({
            card: false,
            list: true
        });
    };


    render() {
        return (
            <div className = "container">
                {this.state.list ? (
                    <div className="list-group">
                        {this.state.players.map(player => (
                            <li onClick={ () => this.showCard(player._id)}
                            className="list-group-item list-group-item-action">
                                {player.name}
                            </li>
                        ))}
                    </div>
                ) : null}

                {this.state.card ? (
                    <div className="card" style={{width: "18rem"}}>
                        <div className="card-body">
                            <h5 className="card-title">{this.state.player.name}</h5>
                            <p className="card-text">{this.state.player.runs}</p>
                            <div onClick={() => this.showList()} className="btn btn-primary">
                                Back
                            </div>
                        </div>
                    </div>
                ) : null}
            </div>
        )
    }


}

// import logo from './logo.svg';
// import './App.css';
//
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//
//
//         <form action="/home" method="post" className="form">
//           <button type="submit">Connected?</button>
//
//         </form>
//
//       </header>
//     </div>
//   );
// }
//
// export default App;
