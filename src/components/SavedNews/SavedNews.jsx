import React from "react";
import { Link, useNavigate } from "react-router-dom";
import SavedNewsCard from "./SavedNewsCard";
import "./SavedNews.css";

function SavedNews({
  savedArticles,
  onRemove,
  isLoggedIn,
  currentUser,
  onBurgerClick, 
  onSignOutClick,
}) {
  const keywords = savedArticles
    .map((article) => article.keyword)
    .filter(Boolean);
  const uniqueKeywords = [...new Set(keywords)];
  const navigate = useNavigate();
  const handleSignOut = () => {
    onSignOutClick();
    navigate("/"); // redirect after sign out
  };


  return (
    <section className="saved__news-wrapper">
      <header className="saved__news-header">
        <div className="saved__news-container">
          <h1 className="saved__news-title">News Explorer</h1>
          <button
            className="burger-menu"
            aria-label="Toggle menu"
            onClick={onBurgerClick}
          >
            ☰
          </button>
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
    </section>
  );
}

export default SavedNews;
