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
            disabled={this.state.comVote === -1 ? true : false}
            onClick={() => {
              this.commentVote("up");
            }}
          >
            {this.state.comVote === 1 ? "Cancel Up Vote" : "Vote Up"}
          </button>{" "}
          <button
            disabled={this.state.comVote === 1 ? true : false}
            onClick={() => {
              this.commentVote("down");
            }}
          >
            {this.state.comVote === -1 ? "Cancel Down Vote" : "Vote Down"}
          </button>
        </span>
      </div>
    );
  }
  commentVote = direction => {
    console.log(direction, this.props.commentId);
    let comVote = this.state.comVote;
    if (direction === "up") {
      comVote === 0 ? comVote++ : comVote--;
    } else {
      comVote === 0 ? comVote-- : comVote++;
    }
    this.setState({ comVote });
    api.changeCommentVote(this.props.commentId, direction).then(res => {
      return res.data;
    });
  };
}

export default VoteComment;
