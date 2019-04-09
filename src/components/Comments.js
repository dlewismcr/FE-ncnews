import "./Comments.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import * as api from "../api.js";
import ListComment from "./ListComment";
import AddCommentModal from "./AddCommentModal";

class Comments extends Component {
  state = {
    comments: [],
    deletedComments: [],
    addedComments: [],
    addCommentModalShow: false
  };

  render() {
    const { comments } = this.state;
    const {sortContent} = this.props;
    const filteredComments = comments
      .concat(this.state.addedComments)
      .filter(comment => {
        return !this.state.deletedComments.includes(comment._id);
      });
    const sortedComments = sortContent(filteredComments);
    return (
      <div className="comments radius">
        <AddCommentModal
          addComment={this.addComment}
          articleId={this.props.articleId}
          show={this.state.addCommentModalShow}
          onHide={this.toggleAddCommentModal}
        />
        {!this.state.addCommentModalShow && (
          <button
            title="Add Comment"
            size="lg"
            className="addCommentBtn"
            onClick={this.toggleAddCommentModal}
          >
            <i className="fas fa-pen addCommentBtnIcon" />
          </button>
        )}
        {sortedComments.map(comment => {
          return (
            <ListComment
              user={this.props.user}
              comment={comment}
              key={comment._id}
              deleteComment={this.deleteComment}
            />
          );
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

  addComment = (articleId, commentText) => {
    const userId = this.props.user._id;
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

  toggleAddCommentModal = () => {
    const show = this.state.addCommentModalShow;
    this.setState({ addCommentModalShow: !show });
  };
}

Comments.propTypes = {
  articleId: PropTypes.string,
  sortContent: PropTypes.func,
  user: PropTypes.object
};

export default Comments;
