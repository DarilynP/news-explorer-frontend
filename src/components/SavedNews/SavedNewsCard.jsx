import React, { useState } from "react";
import trashIcon from "../../assets/images/trash_icon.png";
import trashIconBlack from "../../assets/images/trash_icon-black.png";

function SavedNewsCard({ article, onRemove }) {
  const [showTooltip, setShowTooltip] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleRemove = () => {
    setShowTooltip(true);
    setTimeout(() => {
      onRemove(article);
    }, 20000);
  };

  console.log("isHovered →", isHovered);
  console.log("keyword", article.keyword);
  console.log("article →", article);


  return (
    <div className="saved-news-card">
      <div className="saved-news-card__image-container">
        <img
          className="saved-news-card__image"
          src={article.urlToImage}
          alt={article.title}
        />

        {/* Tag + Remove */}
        <div className="saved-news-card__container">
          <div className="saved-news-card__keyword-tooltip">
            {article.keyword || "Default Category"}
          </div>

          <button
            className="saved-news-card__remove-btn"
            onClick={handleRemove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img src={isHovered ? trashIconBlack : trashIcon} alt="Remove" />
          </button>

          {showTooltip && (
            <div className="saved-news-card__tooltip">Remove from saved</div>
          )}
        </div>
      </div>

      <div className="saved-news-card__info">
        <p className="saved-news-card__date">
          {new Date(article.publishedAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h3 className="saved-news-card__title">{article.title}</h3>
        <p className="saved-news-card__description">{article.description}</p>
        <p className="saved-news-card__source">{article.source?.name}</p>
      </div>
    </div>
  );
}

export default SavedNewsCard;
