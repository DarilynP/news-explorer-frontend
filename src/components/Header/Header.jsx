import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import CurrentUserContext from "../../context/CurrentUserContext";
import MobileMenu from "../MobileMenu/MobileMenu";
import LoginModal from "../Modals/LoginModal";

function Header({ isLoggedIn, onSignInClick, onSignOutClick, modalType }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    console.log("Opening login modal...");
    setIsLoginModalOpen(true);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = () => {
    onSignOutClick();
    setIsMenuOpen(false);
    window.location.href = "/";
  };
  console.log("modalType inside Header:", modalType);

  console.log("modalType:", modalType);

  return (
    <header className="header">
      <div className="header__container">
        <h1 className="header__title">News Explorer</h1>

        <button
          className={`header__burger ${
            isMenuOpen ? "header__burger_hidden" : ""
          } ${modalType ? "modal-open" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        {/* Desktop navigation */}
        <nav className="nav">
          <ul className="nav__list">
            <li>
              <Link to="/" className="nav__link">
                Home
              </Link>
            </li>

            {isLoggedIn && (
              <li>
                <Link to="/saved-news" className="nav__link">
                  Saved News
                </Link>
              </li>
            )}

            <li>
              {isLoggedIn ? (
                <button
                  className="header__button-signin"
                  onClick={handleSignOut}
                >
                  {currentUser.userName}
                </button>
              ) : (
                <button
                  className="header__button-avatar"
                  onClick={onSignInClick}
                >
                  Sign In
                </button>
              )}
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile dropdown menu */}
      <MobileMenu
        isOpen={isMenuOpen}
        isLoggedIn={isLoggedIn}
        onSignInClick={() => {
          onSignInClick(); // triggers modal in App
          setIsMenuOpen(false); // closes mobile menu
        }}
        onSignOutClick={onSignOutClick}
        currentUser={currentUser}
        onClose={() => setIsMenuOpen(false)}
      />
      {isLoginModalOpen && (
        <LoginModal onClose={() => setIsLoginModalOpen(false)} />
      )}
    </header>
  );
}

export default Header;
