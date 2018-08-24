import React, { Component } from "react";
import * as api from "../api.js";
class VoteComment extends Component {
  state = {
    comVote: 0
  };
  render() {
    return (
      <div>
        <span>
          Comment Votes: {this.props.votes + this.state.comVote}{" "}
          <button
            onClick={() => {
              this.commentVote("up");
            }}
          >
            Vote Up
          </button>{" "}
          <button
            onClick={() => {
              this.commentVote("down");
            }}
          >
            Vote Down
          </button>
        </span>
      </div>
    );
  }
  commentVote = direction => {
    console.log(direction, this.props.commentId);
    let comVote = this.state.comVote;
    direction === "up" ? comVote++ : comVote--;
    this.setState({ comVote });
    api.changeCommentVote(this.props.commentId, direction).then(res => {
      return res.data;
    });
  };
}

export default VoteComment;
