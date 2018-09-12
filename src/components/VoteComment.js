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
            className="vote votedown"
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
          {/* {" "}
          {this.props.user.username === this.props.createdBy && (
            <button onClick={this.deleteComment}>Delete Comment</button>
          )} */}
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

  // deleteComment = () => {
  //   api.deleteComment(this.props.commentId);
  // };  no longer used - mising logic for state: deletedComments: []
}

export default VoteComment;
