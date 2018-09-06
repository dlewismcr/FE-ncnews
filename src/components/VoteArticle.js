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
    let userVote = this.state.userVote;
    let voteDirection = "";
    if (direction === "up") {
      if (userVote === 0) {
        userVote++;
        voteDirection = "up";
      } else {
        userVote--;
        voteDirection = "down";
      }
    } else if (direction === "down") {
      if (userVote === 0) {
        userVote--;
        voteDirection = "down";
      } else {
        userVote++;
        voteDirection = "up";
      }
    }
    this.setState({ userVote });
    api.changeArticleVote(this.props.articleId, voteDirection).then(res => {
      return res.data;
    });
  };
}

export default VoteArticle;
