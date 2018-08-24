import React, { Component } from "react";
import * as api from "../api.js";

class VoteArticle extends Component {
  state = {
    userVote: 0
  };
  render() {
    return (
      <div>
        <span>
          Votes: {this.props.votes + this.state.userVote}{" "}
          <button onClick={() => this.articleVote("up")}>Vote Up</button>{" "}
          <button onClick={() => this.articleVote("down")}>Vote Down</button>
        </span>
      </div>
    );
  }
  // componentDidMount() {
  //   console.log(this.props);
  //   this.setState({
  //     articleId: this.props.articleId
  //     // ,
  //     // votes: this.props.votes
  //   });
  // }

  articleVote = direction => {
    console.log(direction, this.props.articleId);
    let userVote = this.state.userVote;
    direction === "up" ? userVote++ : userVote--;
    this.setState({ userVote });
    api.changeArticleVote(this.props.articleId, direction).then(res => {
      return res.data;
    });
  };
}

export default VoteArticle;
