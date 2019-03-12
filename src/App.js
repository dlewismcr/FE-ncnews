import React, { Component } from "react";
import "./App.css";
import { Switch, Route } from "react-router-dom";
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
    }
  };
  render() {
    return (
      <div className="app">
        <NavBar/>
        <Switch>
          <Route exact path="/" render={() => <Articles topic="" />} />
          <Route
            exact
            path="/articles"
            render={() => <Articles topic="" user={this.state.user} />}
          />
          <Route
            path="/articles/:article_id"
            render={props => (
              <Article
                articleId={props.match.params.article_id}
                user={this.state.user}
              />
            )}
          />
          <Route
            path="/topics/:topic/articles"
            render={props => (
              <Articles
                topic={props.match.params.topic}
                user={this.state.user}
              />
            )}
          />
          <Route component={NoMatch} />
        </Switch>
      </div>
    );
  }
}

export default App;
