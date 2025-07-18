import React from "react";
import { Link } from "react-router-dom";
import "./MobileMenu.css";
import closeIcon from "../../assets/images/close.png";

function MobileMenu({
  isOpen,
  isLoggedIn,
  onSignInClick,
  onSignOutClick,
  currentUser,
  onClose,
}) {
  if (!isOpen) return null; // ✅ Return nothing if menu isn't open

  return (
    <div className="mobile-menu__overlay">
      <nav
        className={`mobile-menu ${
          isOpen ? "mobile-menu--open" : "mobile-menu--closed"
        }`}
      >
        <header className="mobile-menu__header">
          <h1 className="mobile-menu__title">News Explorer</h1>
          <button
            className="mobile-menu__close-button"
            onClick={() => {
              console.log("Close button clicked");
              onClose();
            }}
            aria-label="Close menu"
          >
            <img src={closeIcon} alt="Close menu" />
          </button>
        </header>

        <ul className="mobile-menu__list">
          <li className="mobile-menu__item">
            <Link to="/" className="mobile-menu__link" onClick={onClose}>
              Home
            </Link>
          </li>

          <li className="mobile-menu__item">
            {isLoggedIn ? (
              <button
                className="mobile-menu__button"
                onClick={() => {
                  onSignOutClick();
                  onClose();
                  window.location.href = "/";
                }}
              >
                {currentUser?.userName || "Account"}
              </button>
            ) : (
              <button
                className="mobile-menu__button"
                onClick={() => {
                  onSignInClick();
                  onClose();
                }}
              >
                Sign In
              </button>
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default MobileMenu;
