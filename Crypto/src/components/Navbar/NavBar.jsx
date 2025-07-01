import React from "react";
import "./NavBar.css";
import Logo from "../../assets/logo.png";
import arrow_icon from "../../assets/arrow_icon.png";

const NavBar = () => {
  return (
    <div className="navbar">
      <img src={Logo} alt="" className="logo" />
      <ul>
        <li>Home</li>
        <li>Feature</li>
        <li>Pricing</li>
        <li>Blog</li>
      </ul>
      <div className="nav-right">
        <select>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
        </select>
        <button>
          Sign up <img src={arrow_icon} alt="" />
        </button>
      </div>
    </div>
  );
};

export default NavBar;
