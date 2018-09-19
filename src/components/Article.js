import "./Article.css";
import React, { Component } from "react";
// import PT from "prop-types";
import * as api from "../api.js";
import Vote from "./VoteArticle.js";
import Comments from "./Comments.js";
// import AddComment from "./AddComment.js";
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
          <div className="Article">
            <div className="Article-title">
              <h2 className="title-text">{this.state.article.title}</h2>
              <span>
                {this.state.article.created_by.username}
                {": "}
                {moment(this.state.article.created_at)
                  .format("DD/MM/YYYY HH:mm")
                  .toString()}
                {" ("}
                {moment(this.state.article.created_at).fromNow()}
                {") "}
              </span>
            </div>
            <div className="article-body">
              <p className="article-text">{this.state.article.body}</p>
            </div>
            <Vote
              className="Vote"
              articleId={this.state.article._id}
              votes={this.state.article.votes}
            />
          </div>
          <Comments articleId={this.state.article._id} user={this.props.user} />
          {/* <AddComment
            articleId={this.state.article._id}
            user={this.props.user}
          /> */}
        </div>
      );
    } else return null;
  }

  componentDidMount() {
    this.loadArticle();
  }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.article.votes !== this.state.article.votes) {
  //     this.loadArticle();
  //   }
  // }

  loadArticle = () => {
    api.getArticle(this.props.articleId).then(res => {
      this.setState({ article: res.article });
    });
  };

  static propTypes = {};
}

export default Article;
