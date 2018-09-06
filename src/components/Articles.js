import React, { Component } from "react";
// import PT from "prop-types";
import * as api from "../api.js";
import { Link } from "react-router-dom";
import moment from "moment";

class Articles extends Component {
  state = {
    articles: []
  };

  render() {
    return (
      <div className="Articles">
        <br />
        {this.state.articles.map(article => {
          return (
            <div key={article._id}>
              <Link to={`/articles/${article._id}`} votes={article.votes}>
                <div>
                  <h3>{article.title}</h3>
                  <span>
                    {article.created_by.username}
                    {": "}
                    {moment(article.created_at)
                      .format("DD/MM/YYYY HH:MM")
                      .toString()}
                  </span>

                  <p>{article.body}</p>
                  <p>Article Votes: {article.votes}</p>
                  <p>Article Comments: {article.commentCount}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
  componentDidMount() {
    this.loadArticles();
  }

  loadArticles = () => {
    if (this.props.topic !== "") {
      api.fetchArticlesByTopic(this.props.topic).then(res => {
        this.setState({ articles: res.articles });
      });
    } else {
      api.fetchArticles().then(res => {
        this.setState({ articles: res.articles });
      });
    }
  };
}

export default Articles;
