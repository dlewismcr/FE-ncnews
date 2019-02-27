import React, { Component, Redirect } from "react";
import * as api from "../api.js";
import moment from "moment";
import AddArticle from "./AddArticle";
import ListArticle from "./ListArticle";
import PropTypes from "prop-types";
import LoadingModal from "./LoadingModal.jsx";


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
      return moment(b.created_at).isBefore(a.created_at);
    });
    allArticles.reverse();
    if (this.state.loading)
      return (
        <LoadingModal/>
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
          {allArticles.map(article => {
          return <ListArticle key={article._id}article={article} />;
          })}
        </div>
      );
  }

  componentDidMount() {
    this.loadArticles();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.topic !== this.props.topic) {
      this.loadArticles();
    }
  }

  loadArticles = () => {
    if (this.props.topic !== "") {
      api.fetchArticlesByTopic(this.props.topic).then(res => {
        if (res.articles) {
          this.setState({ articles: res.articles, loading: false });
        } else {
          this.setState({ err: res.message.message });
        }
      });
    } else {
      api.fetchArticles().then(res => {
        this.setState({ articles: res.articles, loading: false });
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

Articles.propTypes = {
  topic: PropTypes.string,
  user: PropTypes.object
};

export default Articles;
