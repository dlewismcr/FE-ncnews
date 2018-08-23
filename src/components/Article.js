import React, { Component } from "react";
// import PT from "prop-types";
import * as api from "../api.js";
import Vote from "./Vote.js";
class Article extends Component {
  state = {
    article: []
  };
  render() {
    if (this.state.article.length !== 0) {
      return (
        <div>
          <h3>{this.state.article[0].title}</h3>
          <p>{this.state.article[0].body}</p>
          <Vote />
          {/* <p>Votes: {this.state.article[0].votes}</p>
          <button onClick={() => this.articleVote("up")}>Vote Up</button>{" "}
          <button onClick={() => this.articleVote("down")}>Vote Down</button> */}
        </div>
      );
    } else return null;
  }
  componentDidMount() {
    this.loadArticle();
  }
  componentDidUpdate(prevProps, prevState) {
    console.log(prevProps, prevState);
    if (prevState.article.votes !== this.state.article.votes) {
      this.loadArticle();
    }
  }

  loadArticle = () => {
    api.getArticle(this.props.articleId).then(res => {
      this.setState({ article: res.article });
    });
  };

  articleVote = direction => {
    console.log(direction, this.props.articleId);
    api.changeArticleVote(this.props.articleId, direction).then(res => {
      return res.data;
    });
  };

  static propTypes = {};
}

export default Article;
