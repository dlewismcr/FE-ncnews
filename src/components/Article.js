import "./Article.css";
import React, { Component } from "react";
import PropTypes from "prop-types";
import * as api from "../api.js";
import VoteArticle from "./VoteArticle.js";
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
          <div className="article">
            <div className="article-title">
              <h2 className="article-title-text">
                {this.state.article.title}
              </h2>
              <p className="article-author">
                <img
                  className="list-article-img"
                  src={
                    this.props.avatarSelector(
                      this.state.article.created_by.username
                    ) || this.state.article.created_by.avatar_url
                  }
                  alt="user avatar"
                />{" "}
                Posted by {this.state.article.created_by.name}
                {" ("}
                {this.state.article.created_by.username}
                {"): "}
                {moment(this.state.article.created_at)
                  .format("DD/MM/YYYY HH:mm")
                  .toString()}
                {" ("}
                {moment(this.state.article.created_at).fromNow()}
                {") "}
              </p>
            </div>
            <div className="article-body">
              <p className="article-text">{this.state.article.body}</p>
            </div>
            <VoteArticle
              articleId={this.state.article._id}
              votes={this.state.article.votes}
            />
          </div>
          <Comments
            articleId={this.state.article._id}
            user={this.props.user}
            sortContent={this.props.sortContent}
            avatarSelector={this.props.avatarSelector}
          />
        </div>
      );
    } else return null;
  }

  componentDidMount() {
    this.loadArticle();
  }

  loadArticle = () => {
    api.getArticle(this.props.articleId).then(res => {
      this.setState({ article: res.article });
    });
  };
}
Article.propTypes = {
  articleId: PropTypes.string,
  sortContent: PropTypes.func,
  user: PropTypes.object,
  avatarSelector: PropTypes.func.isRequired
};

export default Article;
