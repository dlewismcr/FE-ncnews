import React, { Component } from "react";
import "./App.css";
import { Route, NavLink } from "react-router-dom";
import Articles from "./components/Articles";
import Article from "./components/Article";
// import { library } from "@fortawesome/fontawesome-svg-core";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { thumbsup } from "@fortawesome/free-solid-svg-icons";

// library.add(thumbsup);
const activeStyle = { color: "red" };

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
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Northcoders News</h1>
        </header>
        <NavLink exact to="/articles" activeStyle={activeStyle}>
          All Articles
        </NavLink>
        {"  |  "}
        <NavLink to="/topics/football/articles" activeStyle={activeStyle}>
          Football
        </NavLink>
        {"  |  "}
        <NavLink to="/topics/coding/articles" activeStyle={activeStyle}>
          Coding
        </NavLink>
        {"  |  "}
        <NavLink to="/topics/cooking/articles" activeStyle={activeStyle}>
          Cooking
        </NavLink>
        <Route exact path="/" render={() => <Articles topic="" />} />
        <Route exact path="/articles" render={() => <Articles topic="" />} />
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
            <Articles topic={props.match.params.topic} user={this.state.user} />
          )}
        />
      </div>
    );
  }
}

export default App;
