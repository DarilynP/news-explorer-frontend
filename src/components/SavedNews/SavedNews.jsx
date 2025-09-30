import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import SavedNewsCard from "./SavedNewsCard";
import Navigation from "../Navigation/Navigation";
import "./SavedNews.css";




function SavedNews({
  savedArticles,
  onRemove,
  isLoggedIn,
  currentUser,
  onBurgerClick,
  onSignOutClick,
  onSignInClick,
  modalType,
  isMobileMenuOpen,
  setIsMobileMenuOpen
}) {
  const keywords = savedArticles
    .map((article) => article.keyword)
    .filter(Boolean);
  const uniqueKeywords = [...new Set(keywords)];
  const navigate = useNavigate();

  const handleSignOut = () => {
    onSignOutClick();
    navigate("/"); 
  };
  console.log("isLoggedIn in SavedNews:", isLoggedIn);

  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        onSignInClick={onSignInClick}
        onSignOutClick={onSignOutClick}
        modalType={modalType}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
            
      <Navigation
        isLoggedIn={isLoggedIn}
        onSignOutClick={handleSignOut}
        onBurgerClick={onBurgerClick}
      /> 

      <section className="saved__news-wrapper">
        {/* <header className="saved__news-header">
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
        </header> */}

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

        <div className="saved__news-list">
          {savedArticles.map((article) => (
            <SavedNewsCard
              key={article.id || article.title}
              article={article}
              onRemove={onRemove}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default SavedNews;
