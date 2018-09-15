import React from "react";
import { NavLink } from "react-router-dom";
const activeStyle = { color: "red" };

const NavLinks = () => {
  return (
    <div>
      <NavLink exact to="/articles" activeStyle={activeStyle}>
        All Articles
      </NavLink>
      {"  |  "}
      <NavLink to="/topics/football/articles" activeStyle={activeStyle}>
        Football
      </NavLink>
      {"  |  "}
      <NavLink to="/topics/coding/articles" activeStyle={activeStyle}>
        Coding
      </NavLink>
      {"  |  "}
      <NavLink to="/topics/cooking/articles" activeStyle={activeStyle}>
        Cooking
      </NavLink>
    </div>
  );
};

export default NavLinks;
