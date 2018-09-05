import React, { Component } from "react";
import * as api from "../api.js";

class VoteArticle extends Component {
  state = {
    userVote: 0
  };
  render() {
    return (
      <div>
        <span>
          Article Votes: {this.props.votes + this.state.userVote}{" "}
          <button
            disabled={this.state.userVote === -1 ? true : false}
            onClick={() => this.articleVote("up")}
          >
            {this.state.userVote === 1 ? "Cancel Up Vote" : "Vote Up"}
          </button>{" "}
          <button
            disabled={this.state.userVote === 1 ? true : false}
            onClick={() => this.articleVote("down")}
          >
            {this.state.userVote === -1 ? "Cancel Down Vote" : "Vote Down"}
          </button>
        </span>
      </div>
    );
  }

  articleVote = direction => {
    console.log(direction, this.props.articleId);
    let userVote = this.state.userVote;
    if (direction === "up") {
      userVote === 0 ? userVote++ : userVote--;
    } else {
      userVote === 0 ? userVote-- : userVote++;
    }
    this.setState({ userVote });
    api.changeArticleVote(this.props.articleId, direction).then(res => {
      return res.data;
    });
  };
}

export default VoteArticle;
