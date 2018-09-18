import "./NavLinks.css";
import React from "react";
import { NavLink } from "react-router-dom";
const activeStyle = { color: "red" };

const NavLinks = () => {
  return (
    <div className="NavLinks">
      <NavLink exact to="/articles" className="link" activeStyle={activeStyle}>
        All Articles
      </NavLink>
      {"  |  "}
      <NavLink
        to="/topics/football/articles"
        className="link"
        activeStyle={activeStyle}
      >
        Football
      </NavLink>
      {"  |  "}
      <NavLink
        to="/topics/coding/articles"
        className="link"
        activeStyle={activeStyle}
      >
        Coding
      </NavLink>
      {"  |  "}
      <NavLink
        to="/topics/cooking/articles"
        className="link"
        activeStyle={activeStyle}
      >
        Cooking
      </NavLink>
    </div>
  );
};

export default NavLinks;
