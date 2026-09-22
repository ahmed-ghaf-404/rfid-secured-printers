import React from "react";
import { NavLink } from "react-router-dom";
import "../assets/styles/navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <NavLink to="/">RFID Printers</NavLink>
      </div>
      <div className="navbar-links">
        <NavLink to="/users">Users</NavLink>
        <NavLink to="/print">Print</NavLink>
        <NavLink to="/register">Register</NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
