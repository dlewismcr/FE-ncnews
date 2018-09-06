import React, { Component } from "react";
// import * as api from "../api.js";

class AddComment extends Component {
  state = {
    commentText: ""
  };
  render() {
    return (
      <form action="">
        <textarea
          name=""
          id=""
          cols="80"
          rows="4"
          placeholder="Add a comment"
          onChange={this.handleText}
          value={this.state.commentText}
        />
        <button onClick={this.handleSubmit}>Submit</button>
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
export default AddComment;
