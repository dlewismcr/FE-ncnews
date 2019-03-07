import React from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink } from "react-router-dom";
import "./NavBar.css"

const activeStyle = { opacity: 0.5 };
const NavBar = () => {
  return (
    <div>
      <>
        <Navbar expand="lg" fixed="top" className="navbar">
          <Navbar.Brand>
            <span className="App-title">Northcoders News</span>
          </Navbar.Brand>
          <Nav className="mr-auto links">
            <NavLink exact to="/articles" activeStyle={activeStyle}>
              <span className="link">All</span>
            </NavLink>
            <NavLink
              to="/topics/coding/articles"
              className="link"
              activeStyle={activeStyle}
            >
              <span className="link">Coding</span>
            </NavLink>
            <NavLink
              to="/topics/cooking/articles"
              className="link cookingLink"
              activeStyle={activeStyle}
            >
              <span className="link">Cooking</span>
            </NavLink>
            <NavLink
              to="/topics/football/articles"
              className="link footballLink"
              activeStyle={activeStyle}
            >
              <span className="link">Football</span>
            </NavLink>
          </Nav>
        </Navbar>
      </>
    </div>
  );
};

export default NavBar;