import React, { Component } from "react";
import "./App.css";
import { Route, NavLink } from "react-router-dom";
import Articles from "./components/Articles";
import * as api from "./api.js";
const activeStyle = { color: "red" };

class App extends Component {
  state = {
    user: "toBeHardcoded",
    articles: []
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
        <Route
          path="/articles"
          render={() => <Articles articles={this.state.articles} />}
        />
        <Route path="/topics/football/articles" render={() => <Articles />} />
        <Route path="/topics/coding/articles" render={() => <Articles />} />
        <Route path="/topics/cooking/articles" render={() => <Articles />} />
      </div>
    );
  }
  componentDidMount() {
    api.fetchArticles().then(res => {
      this.setState({ articles: res.articles });
    });
  }
}

export default App;
