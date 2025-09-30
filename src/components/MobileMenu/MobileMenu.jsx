import React from "react";
import { Link } from "react-router-dom";

import "./MobileMenu.css";
import closeIcon from "../../assets/images/close.png";

function MobileMenu({
  isOpen,
  isLoggedIn,
  onSignInClick,
  onSignOutClick,
  onClose,
}) {
  if (!isOpen) return null;

  return (
    <nav
      className={`mobile-menu ${isOpen ? "mobile-menu--open" : ""}`}
      aria-modal="true"
      role="dialog"
    >
      <div className="mobile-menu__overlay" onClick={onClose}>
        {/* Main content */}
        <div className="mobile-menu__container">
          <header className="mobile-menu__header">
            <h1 className="mobile-menu__title">News Explorer</h1>
            <button
              className="mobile-menu__close"
              onClick={onClose}
              aria-label="Close menu"
            >
              <img
                src={closeIcon}
                alt="Close menu"
                className="mobile__menu__close-icon"
              />
            </button>
          </header>

          <ul className="mobile-menu__list">
            <div className="mobile-menu__links-wrapper">
            <li className="mobile-menu__list-item">
              <Link to="/" className="mobile-menu__link" onClick={onClose}>
                Home
              </Link>
            </li>

            {isLoggedIn && (
              <li className="mobile-menu__list-item">
                <Link
                  to="/saved-news"
                  className="mobile-menu__link"
                  onClick={onClose}
                >
                  Saved Articles
                </Link>
              </li>
                 )}   
              </div>
         

            <li className="mobile-menu__list-item">
              {isLoggedIn ? (
                <button
                  className="mobile-menu__button"
                  onClick={() => {
                    onSignOutClick();
                    onClose();
                  }}
                >
                  Log out
                </button>
              ) : (
                <button
                  className="mobile-menu__button"
                  onClick={() => {
                    onSignInClick();
                    onClose();
                  }}
                >
                  Sign in
                </button>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default MobileMenu;
