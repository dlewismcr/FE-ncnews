import React, { Component, Redirect } from "react";
// import PT from "prop-types";
import * as api from "../api.js";
import { Link } from "react-router-dom";
import moment from "moment";
import AddArticle from "./AddArticle";

class Articles extends Component {
  state = {
    articles: [],
    addedArticles: [],
    err: null
  };

  render() {
    const { articles, addedArticles } = this.state;
    const allArticles = articles.concat(addedArticles);
    allArticles.sort(function(a, b) {
      // console.log(a.created_at, b.created_at);
      return moment(b.created_at).isBefore(a.created_at);
    });
    // .reverse();
    if (this.state.err)
      return (
        <Redirect
          to={{
            pathname: "/error",
            state: { err: this.state.err, from: "article" }
          }}
        />
      );
    return (
      <div className="Articles">
        <br />
        {allArticles.map(article => {
          return (
            <div key={article._id}>
              <Link to={`/articles/${article._id}`} votes={article.votes}>
                <div>
                  <h3>{article.title}</h3>
                  <span>
                    {article.created_by.username}
                    {": "}
                    {moment(article.created_at)
                      .format("DD/MM/YYYY HH:mm")
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
        <AddArticle user={this.props.user} addArticle={this.addArticle} />
      </div>
    );
  }

  componentDidMount() {
    this.loadArticles();
  }

  componentDidUpdate(prevProps) {
    if (this.props.topic !== prevProps.topic) {
      this.loadArticles();
    }
  }

  loadArticles = () => {
    if (this.props.topic !== "") {
      api.fetchArticlesByTopic(this.props.topic).then(res => {
        console.log(res.message);
        if (res.articles) {
          this.setState({ articles: res.articles });
        } else {
          console.log(res);
          this.setState({ err: res.message.message });
        }
      });
    } else {
      api.fetchArticles().then(res => {
        // console.log(res.articles);
        this.setState({ articles: res.articles });
      });
    }
  };

  addArticle = (title, body, user) => {
    api.addArticle(this.props.topic, title, body, user).then(res => {
      const addedArticles = [...this.state.addedArticles].concat(res);
      this.setState({ addedArticles });
    });
  };
}

export default Articles;
