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
      {"    "}
      <NavLink 
        to="/topics/football/articles"
        className="link footballLink"
        activeStyle={activeStyle}
      >
        Football
      </NavLink>
      {"    "}
      <NavLink
        to="/topics/coding/articles"
        className="link codingLink"
        activeStyle={activeStyle}
      >
        Coding
      </NavLink>
      {"    "}
      <NavLink
        to="/topics/cooking/articles"
        className="link cookingLink"
        activeStyle={activeStyle}
      >
        Cooking
      </NavLink>
    </div>
  );
};

export default NavLinks;
