import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import "./NavBar.css";
import PropTypes from "prop-types";
import SortOrderDrawer from "./SortOrderDrawer";

const activeStyle = { opacity: 0.6 };
const NavBar = props => {
  return (
    <div>
      <>
        <Navbar fixed="top">
          <Navbar.Brand>
            <span className="app-title">Northcoders News</span>
          </Navbar.Brand>
          <Nav className="mr-auto links">
            <NavLink exact to="/articles" activeStyle={activeStyle}>
              <span className="link">All</span>
            </NavLink>
            <NavLink
              to="/topics/coding/articles"
              className="codingLink"
              activeStyle={activeStyle}
            >
              <span className="link">Coding</span>
            </NavLink>
            <NavLink
              to="/topics/cooking/articles"
              className="cookingLink"
              activeStyle={activeStyle}
            >
              <span className="link">Cooking</span>
            </NavLink>
            <NavLink
              to="/topics/football/articles"
              className="footballLink"
              activeStyle={activeStyle}
            >
              <span className="link">Football</span>
            </NavLink>
          </Nav>
          <SortOrderDrawer sortBy={props.sortBy} updateSortOrder={props.updateSortOrder}/>
        </Navbar>
      </>
    </div>
  );
};

NavBar.propTypes = {
  sortBy: PropTypes.string,
  updateSortOrder: PropTypes.func
};

export default NavBar;
