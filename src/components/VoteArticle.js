import React, { Component } from "react";
import * as api from "../api.js";
import "./VoteArticle.css";
// import { withStyles } from "@material-ui/core/styles";
// import Icon from "@material-ui/core/Icon";
// import IconButton from "@material-ui/core/IconButton";
// import { Undo, ThumbUp } from "@material-ui/icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// export const Food = () => (
//   <div>
//     Favorite Food: <FontAwesomeIcon icon="stroopwafel" />
//   </div>
// );

class VoteArticle extends Component {
  state = {
    userVote: 0
  };
  render() {
    return (
      <div>
        {/* <i className="material-icons">thumb_up</i>
        <i className="material-icons">thumb_down</i>
        <i className="material-icons">undo</i>
        <FontAwesomeIcon icon="thumbs-up" /> */}
        <span>
          Article Votes: {this.props.votes + this.state.userVote}{" "}
          <button
            className="vote voteup"
            disabled={this.state.userVote === -1 ? true : false}
            onClick={() => this.articleVote("up")}
          >
            {this.state.userVote === 1 ? (
              <i className="material-icons">undo</i>
            ) : (
              <i className="material-icons">thumb_up</i>
            )}
          </button>{" "}
          <button
            className="vote votedown"
            disabled={this.state.userVote === 1 ? true : false}
            onClick={() => this.articleVote("down")}
          >
            {this.state.userVote === -1 ? (
              <i className="material-icons">undo</i>
            ) : (
              <i className="material-icons">thumb_down</i>
            )}
          </button>
        </span>
      </div>
    );
  }

  articleVote = direction => {
    let userVote = this.state.userVote;
    let voteDirection = "";
    if (direction === "up") {
      if (userVote === 0) {
        userVote++;
        voteDirection = "up";
      } else {
        userVote--;
        voteDirection = "down";
      }
    } else if (direction === "down") {
      if (userVote === 0) {
        userVote--;
        voteDirection = "down";
      } else {
        userVote++;
        voteDirection = "up";
      }
    }
    this.setState({ userVote });
    api.changeArticleVote(this.props.articleId, voteDirection).then(res => {
      return res.data;
    });
  };
}

export default VoteArticle;
