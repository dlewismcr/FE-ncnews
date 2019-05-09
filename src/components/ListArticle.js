import "./ListArticle.css";
import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import LinesEllipsis from "react-lines-ellipsis";

const ListArticle = ({article, avatarSelector}) => {
  return (
    <div>
      <Link to={`/articles/${article._id}`} votes={article.votes}>
        <div className="list-article">
          <div className="list-article-title">
            <img
              className="list-article-img"
              src={avatarSelector(article.created_by.username) || article.created_by.avatar_url}
              alt="user avatar"
            /> {" "}
              <span className="list-article-author">
                Posted by: {article.created_by.username}
                {", "}
                {moment(article.created_at).fromNow()}
              </span>{" "}
              <span className="list-article-likes">
                <i className="fas fa-comment-alt" />{" "}{article.commentCount} {" "}<i className="fas fa-heart" /> {article.votes}
              </span>{" "}
            <h1 className="list-article-title-text">
              <LinesEllipsis
                text={article.title}
                maxLine="1"
                ellipsis="..."
                trimRight
                basedOn="words"
              />
            </h1>
          </div>
          <div className="list-article-body">
            <LinesEllipsis
              text={article.body}
              maxLine="4"
              ellipsis="..."
              trimRight
              basedOn="words"
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListArticle;
