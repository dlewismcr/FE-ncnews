import "./ListArticle.css";
import React from "react";
import { Link } from "react-router-dom";
import moment from "moment";

const ListArticle = ({article}) => {
  return (
    <div>
      <Link to={`/articles/${article._id}`} votes={article.votes}>
        <div className="article">
          <div className={`title ${article.belongs_to}`}>
            <h3 className="list-title-text">{article.title}</h3>
          </div>
          <div className={`profile ${article.belongs_to}`}>
            <p className="author">{article.created_by.username}</p>
            <p>
              {" "}
              {moment(article.created_at)
                .format("DD/MM/YYYY HH:mm")
                .toString()}
            </p>
            <p>Comments: {article.commentCount}</p>
            <p>Votes: {article.votes}</p>
          </div>
          <div className="body">
            <p className="body-text">{article.body}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListArticle;
