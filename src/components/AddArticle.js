import React, { Component } from "react";
import "./AddArticle.css";
import PropTypes from "prop-types";

class AddArticle extends Component {
  state = {
    titleText: "",
    articleText: "",
    addArticle: false
  };
  render() {
    return (
      <form className="add-article" action="">
        <br />
        <textarea
          id="article-title"
          cols="80"
          rows="1"
          type="text"
          placeholder={`Title of your new article on ${this.props.topic}:`}
          onChange={this.handleTitle}
          value={this.state.title}
        />
        <br />
        <textarea
          name=""
          id="article-text"
          cols="80"
          rows="2"
          placeholder={`Content of your new article on ${this.props.topic}:`}
          onChange={this.handleText}
          value={this.state.articleText}
        />
        <button id="submit-article" onClick={this.handleSubmit}>
          Submit
          <br />
          Article
        </button>
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
    this.props.addArticle(
      this.state.titleText,
      this.state.articleText,
      this.props.user._id
    );
    this.setState({ articleTitle: "", articleText: "" });
  };
}

AddArticle.propTypes = {
  addArticle: PropTypes.function,
  _id: PropTypes.string
};

export default AddArticle;
