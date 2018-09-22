import "./Comments.css";
import React, { Component } from "react";
// import PT from "prop-types";
import * as api from "../api.js";
import moment from "moment";

import AddComment from "./AddComment.js";
import ListComment from "./ListComment";

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
        {filteredComments.map((comment) => {
          return <ListComment user={this.props.user} comment={comment} />;
        })}
      </div>
    );
  }

  componentDidMount() {
    this.loadComments();
  }

  loadComments = () => {
    api
      .getComments(this.props.articleId)
      .then(res => this.setState({ comments: res.comment }));
  };

  addComment = (articleId, commentText, userId) => {
    api.addComment(articleId, commentText, userId).then(res => {
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
