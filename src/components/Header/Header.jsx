import React from "react";
import "./Header.css";

function Header({ isLoggedIn, onSignInClick }) {
  console.log(
    "Header render - isLoggedIn:",
    isLoggedIn,
    "onSignInClick:",
    onSignInClick
  );

  return (
    <header className="header">
      <div className="header__container">
        <h1 className="header__title">News Explorer</h1>

        <nav className="nav">
          <ul className="header__list">
            <li>
              <a href="/" className="nav__link nav__link_home">
                Home
              </a>
            </li>
            {isLoggedIn && (
              <li>
                <a href="/saved-news">Saved News</a>
              </li>
            )}

            <li>
              <button
                className="header__button-signin"
                onClick={() => {
                  console.log("sign in button clicked");
                  onSignInClick();
                }}
              >
                {isLoggedIn ? "Sign out" : "Sign In"}
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
