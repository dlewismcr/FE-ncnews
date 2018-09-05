import React, { Component } from "react";
// import PT from "prop-types";
import * as api from "../api.js";
import Vote from "./VoteArticle.js";
import Comments from "./Comments.js";
import moment from "moment";

class Article extends Component {
  state = {
    article: {}
  };
  render() {
    if (Object.keys(this.state.article).length !== 0) {
      return (
        <div>
          <br />
          <span>
            {this.state.article.created_by.username}
            {": "}
            {moment(this.state.article.created_at)
              .format("DD/MM/YYYY HH:MM")
              .toString()}
          </span>
          <h2>{this.state.article.title}</h2>
          <p>{this.state.article.body}</p>
          <Vote
            articleId={this.state.article._id}
            votes={this.state.article.votes}
          />
          <Comments articleId={this.state.article._id} />
        </div>
      );
    } else return null;
  }

  componentDidMount() {
    this.loadArticle();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.article.votes !== this.state.article.votes) {
      this.loadArticle();
    }
  }

  loadArticle = () => {
    api.getArticle(this.props.articleId).then(res => {
      this.setState({ article: res.article });
    });
  };

  static propTypes = {};
}

export default Article;
