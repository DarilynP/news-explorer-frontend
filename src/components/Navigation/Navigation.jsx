import React from "react";
import "./Navigation.css";

function Navigation({ isMobile }) {
  return (
    <nav className="nav">
      <ul className={`nav__list ${isMobile ? "nav__list_mobile" : ""}`}>
        <li className="nav__item">
          {/* <a href="/" className="nav__link">Home</a> */}
        </li>
        <li className="nav__item">
          {/* <a href="/saved-news" className="nav__link">Saved News</a> */}
        </li>
        <li className="nav__item">
          {/* <button className="nav__button">Sign In</button> */}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
