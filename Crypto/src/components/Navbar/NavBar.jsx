import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "./NavBar.css";
import Logo from "../../assets/logo.png";
import arrow_icon from "../../assets/arrow_icon.png";
import { CoinContext } from "../../context/CoinContext";

const NavBar = () => {
  const { setCurrency } = useContext(CoinContext);
  const location = useLocation();

  const currencyHandler = (event) => {
    switch (event.target.value) {
      case "usd":
        setCurrency({ name: "usd", Symbol: "$" });
        break;
      case "eur":
        setCurrency({ name: "eur", Symbol: "€" });
        break;
      case "inr":
        setCurrency({ name: "inr", Symbol: "₹" });
        break;
      default:
        break;
    }
  };

  return (
    <div className="navbar">
      <Link to="/" className="logo-link">
        <img src={Logo} alt="Logo" className="logo" />
      </Link>
      <ul>
        <li>
          <Link to="/" className={location.pathname === "/" ? "active" : ""}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/news" className={location.pathname === "/news" ? "active" : ""}>
            📰 News
          </Link>
        </li>
        <li>Feature</li>
        <li>Pricing</li>
        <li>Blog</li>
      </ul>
      <div className="nav-right">
        <select onChange={currencyHandler}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
        </select>
        <button>
          Sign up <img src={arrow_icon} alt="arrow icon" />
        </button>
      </div>
    </div>
  );
};

export default NavBar;
