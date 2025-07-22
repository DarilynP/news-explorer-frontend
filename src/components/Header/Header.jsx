import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";
import CurrentUserContext from "../../context/CurrentUserContext";
import MobileMenu from "../MobileMenu/MobileMenu";
import closeIcon from "../../assets/images/close.png";

function Header({
  isLoggedIn,
  onSignInClick,
  onSignOutClick,
  modalType,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  setModalType,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const location = useLocation();
  const isSavedNewsPage = location.pathname === "/saved-news";

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSignOut = () => {
    onSignOutClick();
    setIsMobileMenuOpen(false);
    window.location.href = "/";
  };
  const onCloseModal = () => {
    setModalType(null);
  };

  return (
    <header className={`header ${isSavedNewsPage ? "header_saved-news" : ""}`}>
      <h1 className="header__title">News Explorer</h1>

      {modalType ? (
        <button
          className="header__close"
          onClick={onCloseModal}
          aria-label="Close modal"
        >
          <img src={closeIcon} alt="Close" className="header__close-icon" />
        </button>
      ) : (
        <button
          className={`header__burger ${
            isMobileMenuOpen ? "header__burger_hidden" : ""
          }`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      )}

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
