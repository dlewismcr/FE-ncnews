import React, { Component, Redirect } from "react";
import "./Articles.css";
// import PT from "prop-types";
import * as api from "../api.js";
import { Link } from "react-router-dom";
import moment from "moment";
import AddArticle from "./AddArticle";

class Articles extends Component {
  state = {
    articles: [],
    addedArticles: [],
    err: null,
    loading: true
  };

  render() {
    const { articles, addedArticles } = this.state;
    const allArticles = articles.concat(addedArticles);
    allArticles.sort(function(a, b) {
      // console.log(a.created_at, b.created_at);
      return moment(b.created_at).isBefore(a.created_at);
    });
    if (this.state.loading)
      return (
        <div>
          <br />
          Loading...
        </div>
        // .reverse();
      );
    if (this.state.err)
      return (
        <Redirect
          to={{
            pathname: "/error",
            state: { err: this.state.err, from: "article" }
          }}
        />
      );
    else
      return (
        <div className="Articles">
          {this.props.topic !== "" && (
            <AddArticle
              user={this.props.user}
              topic={this.props.topic}
              addArticle={this.addArticle}
            />
          )}
          {/* <br /> */}
          {allArticles.map(article => {
            return (
              <div key={article._id}>
                <Link to={`/articles/${article._id}`} votes={article.votes}>
                  <div className="article">
                    <div className="title">
                      <h3 className="title-text">{article.title}</h3>
                    </div>
                    <div className="profile">
                      <p className="author">{article.created_by.username}</p>
                      <p>
                        {" "}
                        {moment(article.created_at)
                          .format("DD/MM/YYYY HH:mm")
                          .toString()}
                      </p>
                      <p>Comments: {article.commentCount}</p>
                      <p>Votes: {article.votes}</p>
                    </div>
                    <div className="body">
                      <p className="body-text">{article.body}</p>
                    </div>
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
    this.setState({
      loading: false
    });
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
