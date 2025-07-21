import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "./MobileMenu.css";
import closeIcon from "../../assets/images/close.png";

function MobileMenu({
  isOpen,
  isLoggedIn,
  onSignInClick,
  onSignOutClick,
  currentUser,
  onClose,
  goToSaveArticles,
}) {
  const location = useLocation();
  const navigate = useNavigate();
  
  console.log("Pathname:", location.pathname);
  console.log("isLoggedIn:", isLoggedIn);


  console.log("MobileMenu open state:", isOpen);
  if (!isOpen) return null;
  
  return (
    <div className="mobile-menu__overlay">
      <nav className="mobile-menu">
        <header className="mobile-menu__header">
          <h1 className="mobile-menu__title">News Explorer</h1>
          <button
            className="mobile__menu-close-button"
            onClick={onClose}
            aria-label="Close menu"
          >
            <img
              src={closeIcon}
              alt="Close menu"
              className="mobile__menu-close-button"
            />
          </button>
        </header>

        <ul className="mobile-menu__list">
          <li className="mobile-menu__item">
            <Link to="/" className="mobile-menu__link" onClick={onClose}>
              Home
            </Link>
          </li>

          {isLoggedIn && location.pathname === "/" && (
            <li className="mobile-menu__item">
              <button
                className="mobile-menu__button"
                onClick={() => {
                  navigate("/saved-news");
                  onClose(); // close menu
                }}
              >
                Saved Articles
              </button>
            </li>
          )}

          {isLoggedIn && location.pathname.startsWith("/saved-news") && (
            <li className="mobile-menu__item">
              <button
                className="mobile-menu__button"
                onClick={() => {
                  onSignOutClick();
                  onClose();
                }}
              >
                Sign Out
              </button>
            </li>
          )}

          {!isLoggedIn && (
            <li className="mobile-menu__item">
              <button
                className="mobile-menu__button"
                onClick={() => {
                  onSignInClick();
                  onClose();
                }}
              >
                Sign In
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default MobileMenu;
