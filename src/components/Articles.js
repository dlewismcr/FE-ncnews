import React, { Component } from "react";
// import PT from "prop-types";
import * as api from "../api.js";
import { Link } from "react-router-dom";

class Articles extends Component {
  state = {
    articles: []
  };

  render() {
    return (
      <div className="Articles">
        {this.state.articles.map(article => {
          return (
            <div key={article._id}>
              <Link to={`/articles/${article._id}`} votes={article.votes}>
                <div>
                  <h3>{article.title}</h3>
                  <p>{article.body}</p>
                  <p>Votes: {article.votes}</p>
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
  componentDidUpdate(prevProps, prevState) {
    if (prevProps.topic !== this.props.topic) {
      this.loadArticles();
    }
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
