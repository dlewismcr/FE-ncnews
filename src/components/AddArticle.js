import React, { Component } from "react";

class AddArticle extends Component {
  state = {
    titleText: "",
    articleText: ""
  };
  render() {
    return (
      <form action="">
        <input
          type="text"
          placeholder="Article Title"
          onChange={this.handleTitle}
          value={this.state.title}
        />
        <br />
        <textarea
          name=""
          id=""
          cols="80"
          rows="4"
          placeholder="Compose a new article"
          onChange={this.handleText}
          value={this.state.articleText}
        />
        <button onClick={this.handleSubmit}>Submit</button>
      </form>
    );
  }

  handleTitle = event => {
    this.setState({
      titleText: event.target.value
    });
  };

  handleText = event => {
    this.setState({
      articleText: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    // console.log(this.props.user._id);
    this.props.addArticle(
      this.state.titleText,
      this.state.articleText,
      this.props.user._id
    );
    this.setState({ articleTitle: "", articleText: "" });
  };
}

export default AddArticle;
