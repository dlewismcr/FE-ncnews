import "./AddComment.css";
import React, { Component } from "react";
import PropTypes from "prop-types";

class AddComment extends Component {
  state = {
    commentText: ""
  };
  render() {
    return (
      <form className="add-comment" action="">
        <textarea
          className="comment-text"
          id=""
          cols="150"
          rows="2"
          placeholder=" Add a comment:"
          onChange={this.handleText}
          value={this.state.commentText}
        />
        <button className="submit" onClick={this.handleSubmit}>
          Submit
        </button>
      </form>
    );
  }
  handleText = event => {
    this.setState({ commentText: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.addComment(
      this.props.articleId,
      this.state.commentText,
      this.props.user._id
    );
    this.setState({ commentText: "" });
  };
}

AddComment.propTypes = {
  addComment: PropTypes.function,
  articleId: PropTypes.string,
  _id: PropTypes.string
};
export default AddComment;
