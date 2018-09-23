import "./VoteArticle.css";
import React, { Component } from "react";
import * as api from "../api.js";
import "./VoteArticle.css";
import PropTypes from "prop-types";

class VoteArticle extends Component {
  state = {
    userVote: 0
  };
  render() {
    return (
      <div className="article-vote">
        <div className="votecount">
          Article Votes
          <br />
          <div className="count">{this.props.votes + this.state.userVote}</div>
        </div>
        <span>
          <button
            className="vote voteup"
            disabled={this.state.userVote === -1 ? true : false}
            onClick={() => this.articleVote("up")}
          >
            {this.state.userVote === 1 ? (
              <i className="material-icons">undo</i>
            ) : (
              <i className="material-icons">thumb_up</i>
            )}
          </button>
          <button
            className="vote votedown"
            disabled={this.state.userVote === 1 ? true : false}
            onClick={() => this.articleVote("down")}
          >
            {this.state.userVote === -1 ? (
              <i className="material-icons">undo</i>
            ) : (
              <i className="material-icons">thumb_down</i>
            )}
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

VoteArticle.propTypes = {
  articleId: PropTypes.string,
  votes: PropTypes.number
};

export default VoteArticle;
