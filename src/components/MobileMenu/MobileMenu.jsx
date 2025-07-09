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
  console.log("MobileMenu props →", {
    isOpen,
    isLoggedIn,
    currentUser,
  });

  return (
    <div className="modal__overlay-mobile">
      <nav className="mobile__menu mobile__menu-open">
        {" "}
        <div className="mobile__container">
          <h1 className="mobile__title">News Explorer</h1>
          <button className="mobile__menu-close" onClick={onClose} />
        </div>
        <ul className="mobile__menu-list">
          <li>
            <Link to="/" className="mobile__menu-link" onClick={onClose}>
              Home
            </Link>
          </li>
          <li>
            {isLoggedIn ? (
              <button
                className="mobile__menu-button"
                onClick={() => {
                  onSignOutClick();
                  onClose();
                  window.location.href = "/";
                }}
              >
                {currentUser.userName}
              </button>
            ) : (
              <button
                className="mobile__menu-button"
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
