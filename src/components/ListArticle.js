import "./ListArticle.css";
import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";
import LinesEllipsis from "react-lines-ellipsis";

const ListArticle = ({article}) => {
  // renderSwitch handles broken original article.created_by.avatar_url links
  const renderSwitch = username => {
    switch (username) {
      case "jessjelly":
      case "happyamy2016":
        return article.created_by.avatar_url;
      case "weegembump":
        return "/images/bump.png";
      case "tickle122":
        return "/images/tickle.png";
      case "cooljmessy":
        return "/images/messy.webp";
      case "grumpy19":
        return "/images/grumpy.png";
      default:
        return "/images/pngkey.com-shadow-figure-png-4047048.png";
    };
  };
  return (
    <div>
      <Link to={`/articles/${article._id}`} votes={article.votes}>
        <div className="list-article">
          <div className="list-article-title">
            <h3 className="list-article-title-text">
              {article.title}{" "}
              <span className="list-article-author">
                Posted by: {article.created_by.username}
                {", "}
                {moment(article.created_at).fromNow()}
              </span>{" "}
              <span className="list-article-likes">
                <i className="fas fa-comment-alt" />{" "}{article.commentCount} {" "}<i className="fas fa-heart" /> {article.votes}
              </span>{" "}
            </h3>
          </div>
          <div className="list-article-profile">
            <img
              className="list-article-img"
              src={renderSwitch(article.created_by.username)}
              alt="user avatar"
            />
          </div>
          <div className="list-article-body">
            <LinesEllipsis
              text={article.body}
              maxLine="3"
              ellipsis="..."
              trimRight
              basedOn="letters"
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListArticle;
