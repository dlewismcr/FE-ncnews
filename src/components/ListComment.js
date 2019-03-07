import React from 'react';
import moment from "moment";
import VoteComment from "./VoteComment.js";

const ListComment = ({comment, user, deleteComment}) => {
  return (
    <div className="comment" key={comment._id}>
      <span className="comment-heading">
        {comment.created_by.username}
        {": "}
        {moment(comment.created_at)
          .format("DD/MM/YYYY HH:mm")
          .toString()}
        {" ("}
        {moment(comment.created_at).fromNow()}
        {") "}
        {user.username === comment.created_by.username && (
          <button
            className="delete-comment"
            onClick={() => deleteComment(comment._id)}
          >
            <i className="fas fa-trash-alt" />
          </button>
        )}
      </span>
      <p>{comment.body}</p>
      <VoteComment
        votes={comment.votes}
        commentId={comment._id}
        createdBy={comment.created_by.username}
      />
      <br />
    </div>
  );
};

export default ListComment;