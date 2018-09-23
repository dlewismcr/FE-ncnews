import "./VoteComment.css";
import React, { Component } from "react";
import * as api from "../api.js";
import PropTypes from "prop-types";

class VoteComment extends Component {
  state = {
    comVote: 0
  };
  render() {
    return (
      <div className="VoteComment">
        <span className="commentSpan">
          Votes: {this.props.votes + this.state.comVote}{" "}
          <button
            className="vote voteup"
            disabled={this.state.comVote === -1 ? true : false}
            onClick={() => {
              this.commentVote("up");
            }}
          >
            {this.state.comVote === 1 ? (
              <i className="material-icons">undo</i>
            ) : (
              <i className="material-icons">thumb_up</i>
            )}
          </button>{" "}
          <button
            className="vote votedown articleVoteDown"
            disabled={this.state.comVote === 1 ? true : false}
            onClick={() => {
              this.commentVote("down");
            }}
          >
            {this.state.comVote === -1 ? (
              <i className="material-icons">undo</i>
            ) : (
              <i className="material-icons">thumb_down</i>
            )}
          </button>
        </span>
      </div>
    );
  }
  commentVote = direction => {
    let comVote = this.state.comVote;
    let voteDirection = "";
    if (direction === "up") {
      if (comVote === 0) {
        comVote++;
        voteDirection = "up";
      } else {
        comVote--;
        voteDirection = "down";
      }
    } else if (direction === "down") {
      if (comVote === 0) {
        comVote--;
        voteDirection = "down";
      } else {
        comVote++;
        voteDirection = "up";
      }
    }
    this.setState({ comVote });
    api.changeCommentVote(this.props.commentId, voteDirection).then(res => {
      return res.data;
    });
  };
}

VoteComment.propTypes = {
  votes: PropTypes.number,
  commentId: PropTypes.string
};

export default VoteComment;
