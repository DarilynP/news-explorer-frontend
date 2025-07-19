import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ModalWithForm from "../Modals/ModalWithForm";
import SavedNewsCard from "./SavedNewsCard";
import "./SavedNews.css";

function SavedNews({
  savedArticles,
  onRemove,
  isLoggedIn,
  currentUser,
  onSignOutClick,
  onSignInSuccess, // callback to update auth state on sign-in
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isSignInModalOpen, setSignInModalOpen] = useState(false);
  const navigate = useNavigate();
  // Form state for example (email/password)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormFilled, setIsFormFilled] = useState(false);

  const handleBurgerClick = () => {
    if (!isLoggedIn) {
      // If not logged in, open sign-in modal
      setSignInModalOpen(true);
      // Make sure the menu is closed
      setMenuOpen(false);
    } else {
      // Toggle menu open/close
      setMenuOpen((prev) => !prev);
    }
  };

  const closeSignInModal = () => {
    setSignInModalOpen(false);
    setEmail("");
    setPassword("");
    setIsFormFilled(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);

    // Update isFormFilled if both email and password have values
    setIsFormFilled(
      (name === "email" ? value : email).trim() !== "" &&
        (name === "password" ? value : password).trim() !== ""
    );
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();

    // Simulate login success
    onSignInSuccess({
      userName: email.split("@")[0],
      email: email,
    });

    closeSignInModal();
    setMenuOpen(false); // Close burger menu if open
    navigate("/saved-news"); // Go to saved news page
  };

  const keywords = savedArticles
    .map((article) => article.keyword)
    .filter(Boolean);
  const uniqueKeywords = [...new Set(keywords)];

  return (
    <section className="saved__news-wrapper">
      <section className="saved__news">
        <header className="saved__news-header">
          <div className="saved__news-container">
            <h1 className="saved__news-title">News Explorer</h1>
            <button
              className="burger-menu"
              aria-label="Toggle menu"
              onClick={handleBurgerClick}
            >
              ☰
            </button>
            <nav className={`saved__news-nav ${menuOpen ? "open" : ""}`}>
              <ul className="saved__news-nav-list">
                <li className="saved__news-nav-item">
                  <Link
                    to="/saved-news"
                    className="saved__news-nav-link saved__news-nav-link_active"
                    onClick={() => setMenuOpen(false)}
                  >
                    Saved News
                  </Link>
                </li>
                {isLoggedIn && (
                  <>
                    <li className="saved__news-nav-item">
                      <Link
                        to="/saved-news"
                        className="saved__news-nav-link saved__news-nav-link_active"
                        onClick={() => setMenuOpen(false)}
                      >
                        Saved News
                      </Link>
                    </li>
                    <li className="saved__news-nav-item">
                      <button
                        className="header__button-signin header__button-signin_saved-page"
                        onClick={() => {
                          onSignOutClick();
                          setMenuOpen(false); //close menu when sign out
                          window.location.href = "/";
                        }}
                      >
                        {currentUser?.userName || "Sign Out"}
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </div>
        </header>

        <div className="saved__news-intro">
          <h2 className="saved__news-subheader">Saved Articles</h2>
          <p className="saved__news-summary">
            {currentUser?.userName || "Darilyn"}, you have{" "}
            {savedArticles.length} saved articles
          </p>
          <p className="saved__news-keywords">
            By keywords:{" "}
            {uniqueKeywords.length > 0 ? (
              <>
                <b>{uniqueKeywords[0]}</b>
                {uniqueKeywords.length > 1 && (
                  <>
                    {" "}
                    and {uniqueKeywords.length - 1} other
                    {uniqueKeywords.length - 1 > 1 ? "s" : ""}
                  </>
                )}
              </>
            ) : (
              <b>Uncategorized</b>
            )}
          </p>
        </div>

        <section className="saved__news-list">
          {savedArticles.map((article) => (
            <SavedNewsCard
              key={article.id || article.title}
              article={article}
              onRemove={onRemove}
            />
          ))}
        </section>

        {/* ModalWithForm sign-in modal */}
        <ModalWithForm
          title="Sign In"
          isModalOpen={isSignInModalOpen}
          onClose={closeSignInModal}
          onSubmit={handleSignInSubmit}
          isFormFilled={isFormFilled}
          type="login"
          onSwitchToSignUp={() => {
            // Optional: switch modal type or open signup modal
            // Example: alert("Switch to Sign Up");
          }}
        >
          <label>
            Email
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleInputChange}
              required
              autoFocus
            />
          </label>
          <label>
            Password
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleInputChange}
              required
            />
          </label>
        </ModalWithForm>
      </section>
    </section>
  );
}

export default SavedNews;
