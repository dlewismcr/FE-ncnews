import React, { Component } from "react";
import * as api from "../api.js";
import PropTypes from "prop-types";

class VoteArticle extends Component {
  state = {
    userVote: 0
  };
  render() {
    return (
      <div className="vote">
        <button
          className="vote-angle vote-up"
          disabled={this.state.userVote === -1 ? true : false}
          onClick={() => this.articleVote("up")}
        >
          <i
            className={
              this.state.userVote === 1
                ? "fas fa-undo"
                : "fas fa-angle-up"
            }
          />
        </button>
        <div className="vote-num">
        {this.props.votes + this.state.userVote}
        </div>
        <button
          className="vote-angle vote-d"
          disabled={this.state.userVote === 1 ? true : false}
          onClick={() => this.articleVote("down")}
        >
          <i
            className={
              this.state.userVote === -1
                ? "fas fa-undo"
                : "fas fa-angle-down"
            }
          />
        </button>
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

VoteArticle.propTypes = {
  articleId: PropTypes.string,
  votes: PropTypes.number
};

export default VoteArticle;
