import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./SavedNews.css";
import SavedNewsCard from "./SavedNewsCard";

function SavedNews({
  savedArticles,
  onRemove,
  isLoggedIn,
  currentUser,
  onSignOutClick,
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const keywords = savedArticles
    .map((article) => article.keyword)
    .filter(Boolean);

  // Get unique keywords
  const uniqueKeywords = [...new Set(keywords)];

  return (
    <section className="saved__news-wrapper">
      <section className="saved__news">
        {/* Header */}
        <header className="saved__news-header">
          <div className="saved__news-container">
            <h1 className="saved__news-title">News Explorer</h1>
            <button
              className="burger-menu"
              aria-label="Toggle menu"
              onClick={toggleMenu}
            >
              ☰
            </button>
            <nav className={`saved__news-nav ${menuOpen ? "open" : ""}`}>
              <ul className="saved__news-nav-list">
                <li className="saved__news-nav-item">
                  <Link to="/" className="saved__news-nav-link">
                    Home
                  </Link>
                </li>
                {isLoggedIn && (
                  <>
                    <li className="saved__news-nav-item">
                      <Link
                        to="/saved-news"
                        className="saved__news-nav-link saved__news-nav-link_active"
                      >
                        Saved News
                      </Link>
                    </li>
                    <li className="saved__news-nav-item">
                      <button
                        className="header__button-signin header__button-signin_saved-page"
                        onClick={() => {
                          onSignOutClick();
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

        {/* Intro */}
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

        {/* Saved Cards */}

        <section className="saved__news-list">
          {savedArticles.map((article) => (
            <SavedNewsCard
              key={article.id || article.title}
              article={article}
              onRemove={onRemove}
            />
          ))}
        </section>
      </section>
    </section>
  );
}

export default SavedNews;
