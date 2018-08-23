import React, { Component } from "react";

class Vote extends Component {
  state = {
    votes: 0
  };
  render() {
    return (
      <div>
        <p>Votes: {this.state.votes}</p>
        <button onClick={() => this.articleVote("up")}>Vote Up</button>{" "}
        <button onClick={() => this.articleVote("down")}>Vote Down</button>
      </div>
    );
  }
}

export default Vote;
