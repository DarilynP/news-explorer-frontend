import React, { useState, useContext } from "react";
import "./NewsCard.css";
import saveTag from "../../assets/images/save_tag.png";
import savedTag from "../../assets/images/saved_tag.png";
import CurrentUserContext from "../../context/CurrentUserContext";
import trash_icon from "../../assets/images/trash_icon.png";

function NewsCard({
  article,
  isSaved,
  isLoggedIn,
  onSave,
  onRemove,
  isSavedPage,
}) {
  const { currentUser } = useContext(CurrentUserContext);
  const [showTooltip, setShowTooltip] = useState(false);

  // Parse date and split it
  const publishedDate = new Date(article.publishedAt);
  const day = publishedDate.getDate();
  const month = publishedDate.toLocaleString("default", { month: "long" });
  const year = publishedDate.getFullYear();

  const handleSaveClick = () => {
    if (!isLoggedIn || !currentUser) {
      alert("Please log in to save article");
      return;
    }
    if (isSavedPage) {
      // Remove from saved page
      onRemove(article);
      setShowTooltip(true);
    } else {
      // Save or unsave from main page
      isSaved ? onRemove(article) : onSave(article);
    }
  };

  return (
    <div className="news__card">
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="news__card-image"
        />
      )}
      {article.keyword && (
        <span className="news__card-tag">{article.keyword}</span>
      )}

      {isSavedPage && showTooltip && (
        <div className="news__card-tooltip">remove from saved</div>
      )}

      <div className="news__card-content">
        <div className="news__card-date">
          <span className="news__card-date-month">{month}</span>
          <span className="news__card-date-day">{day},</span>
          <span className="news__card-date-year">{year}</span>
        </div>

        <h2 className="news__card-title">
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            {article.title}
          </a>
        </h2>

        <p>{article.description?.slice(0, 100)}...</p>

        <div className="news__card-footer">
          <span>{article.source.name}</span>
        </div>
      </div>

      {/* Save / Remove icon */}
      {isLoggedIn && (
        <img
          src={
            isSavedPage
              ? trash_icon // show trash icon on saved page
              : isSaved
              ? savedTag // article is already saved
              : saveTag // not saved yet
          }
          alt={isSavedPage ? "Remove" : isSaved ? "Saved" : "Save"}
          className="news__card-save-icon"
          onClick={handleSaveClick}
        />
      )}
    </div>
  );
}

export default NewsCard;
