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
  console.log("Header currentUser:", currentUser);
  console.log("Header isLoggedIn:", isLoggedIn);

  return (
    <header className="header">
      <h1 className="header__title">News Explorer</h1>

      <button
        className={`header__burger ${
          isMenuOpen ? "header__burger_hidden" : ""
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
      {/* </div> */}
      {/* </div> */}

      <MobileMenu
        isOpen={isMenuOpen}
        isLoggedIn={isLoggedIn}
        onSignInClick={() => {
          onSignInClick();
          setIsMenuOpen(false);
        }}
        onSignOutClick={onSignOutClick}
        currentUser={currentUser}
        onClose={() => setIsMenuOpen(false)}
      />
    </header>
  );
}

export default Header;
