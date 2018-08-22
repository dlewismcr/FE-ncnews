import React from "react";
import PT from "prop-types";

const Articles = ({ articles }) => {
  return (
    <div className="Articles">
      <h2>Articles</h2>
      <p>{articles}</p>
    </div>
  );
};

export default Articles;
