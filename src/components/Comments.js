import React, { Component } from "react";
// import PT from "prop-types";
import * as api from "../api.js";
import moment from "moment";
import VoteComment from "./VoteComment.js";

class Comments extends Component {
  state = {
    comments: []
  };

  render() {
    return (
      <div className="Comments">
        <br />
        {this.state.comments.map(comment => {
          return (
            <div key={comment._id}>
              <span>
                {comment.created_by}
                {": "}
                {moment(comment.created_at)
                  .format("DD/MM/YYYY HH:MM")
                  .toString()}
              </span>
              <p>{comment.body}</p>
              <VoteComment votes={comment.votes} commentId={comment._id} />
              <br />
            </div>
          );
        })}
      </div>
    );
  }

  componentDidMount() {
    this.loadComments();
  }

  loadComments = () => {
    api
      .getComments(this.props.articleId)
      .then(res => this.setState({ comments: res.comment }));
  };

  static propTypes = {};
}

export default Comments;
