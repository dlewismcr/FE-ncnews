import React, { Component } from "react";
// import PT from "prop-types";
import * as api from "../api.js";
import moment from "moment";
import VoteComment from "./VoteComment.js";
import AddComment from "./AddComment.js";

class Comments extends Component {
  state = {
    comments: [],
    deletedComments: []
  };

  render() {
    const { comments } = this.state;
    const filteredComments = comments.filter(comment => {
      return !this.state.deletedComments.includes(comment._id);
    });
    filteredComments.sort(function(a, b) {
      return moment(b.created_at).isBefore(a.created_at);
    });
    return (
      <div className="Comments">
        <br />
        {filteredComments.map(comment => {
          return (
            <div key={comment._id}>
              <span>
                {comment.created_by.username}
                {": "}
                {moment(comment.created_at)
                  .format("DD/MM/YYYY HH:MM")
                  .toString()}
                {/* use moment .fromNow() for 5 hrs ago */}{" "}
                {this.props.user.username === comment.created_by.username && (
                  <button onClick={() => this.deleteComment(comment._id)}>
                    Delete Your Comment
                  </button>
                )}
              </span>
              <p>{comment.body}</p>
              <VoteComment
                votes={comment.votes}
                commentId={comment._id}
                createdBy={comment.created_by.username}
                user={this.props.user}
              />
              <br />
            </div>
          );
        })}
        <AddComment articleId={this.props.articleId} user={this.props.user} />
      </div>
    );
  }

  componentDidMount() {
    this.loadComments();
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (
      prevState.deletedComments.length !== this.state.deletedComments.length
    ) {
      console.log("update deleted comments");
      this.loadComments();
    }
  };
  // componentDidUpdate = async (prevProps, prevState) => {
  //   if (prevState.comments.length !== this.state.comments.length) {
  //     console.log("update");
  //     this.loadComments();
  //   }
  // };

  loadComments = () => {
    api
      .getComments(this.props.articleId)
      .then(res => this.setState({ comments: res.comment }));
  };

  deleteComment = commentId => {
    const deleted = [...this.state.deletedComments];
    deleted.push(commentId);
    this.setState({
      deletedComments: deleted
    });
    api.deleteComment(commentId);
  };

  static propTypes = {};
}

export default Comments;
