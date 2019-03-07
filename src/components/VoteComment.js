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
      <div className="vote-comment">
        <button
          className="vote"
          disabled={this.state.comVote === -1 ? true : false}
          onClick={() => {
            this.commentVote("up");
          }}
        >
          <i
            className={
              this.state.comVote === 1
                ? "fas fa-undo"
                : "fas fa-angle-up"
            }
          />
        </button>
        <br />
        <p className="vote-num">{this.props.votes + this.state.comVote}</p>
        <br />
        <button
          className="vote"
          disabled={this.state.comVote === 1 ? true : false}
          onClick={() => {
            this.commentVote("down");
          }}
        >
          <i
            className={
              this.state.comVote === -1
                ? "fas fa-undo"
                : "fas fa-angle-down"
            }
          />
        </button>
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
