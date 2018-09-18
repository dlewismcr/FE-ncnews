import "./Comments.css";
import React, { Component } from "react";
// import PT from "prop-types";
import * as api from "../api.js";
import moment from "moment";
import VoteComment from "./VoteComment.js";
import AddComment from "./AddComment.js";

class Comments extends Component {
  state = {
    comments: [],
    deletedComments: [],
    addedComments: []
  };

  render() {
    const { comments } = this.state;
    const filteredComments = comments
      .concat(this.state.addedComments)
      .filter(comment => {
        return !this.state.deletedComments.includes(comment._id);
      });
    filteredComments.sort(function(a, b) {
      return moment(b.created_at).isBefore(a.created_at);
    });
    filteredComments.reverse();
    return (
      <div className="Comments">
        <br />
        <AddComment
          articleId={this.props.articleId}
          user={this.props.user}
          addComment={this.addComment}
        />
        {filteredComments.map(comment => {
          return (
            <div className="comment" key={comment._id}>
              <span className="comment-heading">
                {comment.created_by.username}
                {": "}
                {moment(comment.created_at)
                  .format("DD/MM/YYYY HH:mm")
                  .toString()}
                {" ("}
                {moment(comment.created_at).fromNow()}
                {") "}
                {this.props.user.username === comment.created_by.username && (
                  <button
                    className="delete-comment"
                    onClick={() => this.deleteComment(comment._id)}
                  >
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
      </div>
    );
  }

  componentDidMount() {
    this.loadComments();
  }

  // componentDidUpdate = (prevProps, prevState) => {
  //   if (
  //     prevState.deletedComments.length !== this.state.deletedComments.length
  //   ) {
  //     console.log("update deleted comments");
  //     this.loadComments();
  //   }
  // };

  // componentDidUpdate = (prevProps, prevState) => {
  //   if (prevState.addedComments !== this.state.addedComments) {
  //     console.log("componentDidUpdate");
  //     this.loadComments();
  //   }
  // };

  loadComments = () => {
    api
      .getComments(this.props.articleId)
      .then(res => this.setState({ comments: res.comment }));
  };

  addComment = (articleId, commentText, userId) => {
    api.addComment(articleId, commentText, userId).then(res => {
      console.log("addcomment", res);
      const addedComments = [...this.state.addedComments].concat(res);
      this.setState({ addedComments });
    });
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
