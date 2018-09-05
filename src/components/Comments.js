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
    const { comments } = this.state;
    comments.sort(function(a, b) {
      return b.created_at - a.created_at;
    });
    return (
      <div className="Comments">
        <br />
        {comments.map(comment => {
          return (
            <div key={comment._id}>
              <span>
                {comment.created_by.username}
                {": "}
                {moment(comment.created_at)
                  .format("DD/MM/YYYY HH:MM")
                  .toString()}
                {/* use moment .fromNow() for 5 hrs ago */}
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
