import React, { Component } from "react";
import "./App.css";
import { Route, NavLink } from "react-router-dom";
import Articles from "./components/Articles";
import Article from "./components/Article";

const activeStyle = { color: "red" };

class App extends Component {
  state = {
    user: "toBeHardcoded"
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Northcoders News</h1>
        </header>
        <NavLink to="/articles" activeStyle={activeStyle}>
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
        <Route exact path="/articles" render={() => <Articles topic="" />} />
        <Route
          path="/articles/:article_id"
          render={props => (
            <Article articleId={props.match.params.article_id} />
          )}
        />
        <Route
          path="/topics/:topic/articles"
          render={props => <Articles topic={props.match.params.topic} />}
        />
      </div>
    );
  }
}

export default App;
