import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import CurrentUserContext from "../../context/CurrentUserContext";
import MobileMenu from "../MobileMenu/MobileMenu";

function Header({
  isLoggedIn,
  onSignInClick,
  onSignOutClick,
  modalType,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const location = useLocation();
  // Toggle mobile menu open state using prop setter
  const toggleMenu = () => {
    console.log("Toggling menu from:", isMobileMenuOpen);
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignOut = () => {
    onSignOutClick();
    setIsMobileMenuOpen(false);
    window.location.href = "/";
  };

  return (
    <header className="header">
      <h1 className="header__title">News Explorer</h1>

      <button
        className={`header__burger ${
          isMobileMenuOpen ? "header__burger_hidden" : ""
        } ${modalType ? "header__burger--modal-open" : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        ☰
      </button>

      <nav className="header__nav">
        <ul className="header__nav-list">
          <li>
            <Link to="/" className="header__nav-link">
              Home
            </Link>
          </li>

          {isLoggedIn && (
            <li>
              <Link
                to="/saved-news"
                className="header__nav-link header__nav-underline"
              >
                Saved News
              </Link>
            </li>
          )}

          <li>
            {isLoggedIn ? (
              <button className="header__button-logout" onClick={handleSignOut}>
                {currentUser?.userName || "User"}
              </button>
            ) : (
              <button className="header__button-avatar" onClick={onSignInClick}>
                Sign In
              </button>
            )}
          </li>
        </ul>
      </nav>

      {/* Mobile menu controlled by props */}
      <MobileMenu
        key={location.pathname}
        isOpen={isMobileMenuOpen}
        isLoggedIn={isLoggedIn}
        onSignInClick={onSignInClick}
        onSignOutClick={handleSignOut}
        currentUser={currentUser}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </header>
  );
}

export default Header;
