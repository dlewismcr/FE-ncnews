import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import moment from "moment";
import Articles from "./components/Articles";
import Article from "./components/Article";
import NoMatch from "./components/NoMatch";
import NavBar from "./components/NavBar";

class App extends Component {
  state = {
    user: {
      _id: "5b64862bdcfcda7c02dbb446",
      username: "grumpy19",
      name: "Paul Grump",
      avatar_url:
        "https://www.tumbit.com/profile-image/4/original/mr-grumpy.jpg",
      __v: 0
    },
    sortBy: "Newest"
  };
  render() {
    return (
      <div className="app">
        <NavBar
          sortBy={this.state.sortBy}
          updateSortOrder={this.updateSortOrder}
        />
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Articles topic="" sortContent={this.sortContent} />}
          />
          <Route
            exact
            path="/articles"
            render={() => (
              <Articles
                topic=""
                sortContent={this.sortContent}
                user={this.state.user}
              />
            )}
          />
          <Route
            path="/articles/:article_id"
            render={props => (
              <Article
                articleId={props.match.params.article_id}
                sortContent={this.sortContent}
                user={this.state.user}
              />
            )}
          />
          <Route
            path="/topics/:topic/articles"
            render={props => (
              <Articles
                topic={props.match.params.topic}
                sortContent={this.sortContent}
                user={this.state.user}
              />
            )}
          />
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }

  sortContent = content => {
    const { sortBy } = this.state;
    return content.sort(function(a, b) {
      switch (sortBy) {
        case "Oldest":
          return moment(a.created_at).diff(moment(b.created_at));
        case "Votes (high to low)":
          return b.votes - a.votes;
        case "Votes (low to high)":
          return a.votes - b.votes;
        default:
          return moment(b.created_at).diff(moment(a.created_at));
      }
    });
  };

  updateSortOrder = order => {
    this.setState({
      sortBy: order
    });
  };
}

export default App;
