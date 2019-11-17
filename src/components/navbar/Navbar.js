import React from "react";
import "./Navbar.css";
import { FaShoppingCart, FaRegBell, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

export default class Navbar extends React.Component {
  render() {
    return (
      <div className="navbar-wrapper">
        <div>
          <Link to="/compareCart">
            <FaShoppingCart />
          </Link>
        </div>
        <div>
          <FaRegBell />
        </div>
        <div>
          <FaUserCircle />
        </div>
      </div>
    );
  }
}
