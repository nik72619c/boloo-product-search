import React from "react";
import "./Navbar.css";
import { FaShoppingCart, FaRegBell, FaUserCircle } from "react-icons/fa";
import { IoIosMore } from "react-icons/io";
import { Link } from "react-router-dom";

export default class Navbar extends React.Component {
  render() {
    return (
      <div className="navbar-wrapper">
        <div>
          <Link to="/compareCart">
            <FaShoppingCart className="navbar-icon" />
          </Link>
        </div>
        <div>
          <FaRegBell className="navbar-icon" />
        </div>
        <div>
          <FaUserCircle className="navbar-icon" />
        </div>
        <div>
          <IoIosMore className="navbar-icon" />
        </div>
      </div>
    );
  }
}
