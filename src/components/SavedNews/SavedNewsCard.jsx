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

  return (
    <div className="saved__news-card">
      <div className="saved__news-card-image-container">
        <img
          className="saved__news-card-image"
          src={article.urlToImage}
          alt={article.title}
        />

        <div className="saved__news-card-controls">
          <div className="saved__news-card-keyword-tooltip">
            {article.keyword || "Default Category"}
          </div>

          <button
            className="saved__news-card-remove-btn"
            onClick={handleRemove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            aria-label="Remove saved article"
          >
            <img
              className="saved__news-card-remove-icon"
              src={isHovered ? trashIconBlack : trashIcon}
              alt="Remove"
            />
          </button>

          {showTooltip && (
            <div className="saved__news-card-tooltip">Remove from saved</div>
          )}
        </div>
      </div>

      <div className="saved__news-card-info">
        <p className="saved__news-card-date">
          {new Date(article.publishedAt).toLocaleDateString(undefined, {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
        <h3 className="saved__news-card-title">{article.title}</h3>
        <p className="saved__news-card-description">{article.description}</p>
        <p className="saved__news-card-source">{article.source?.name}</p>
      </div>
    </div>
  );
}

export default SavedNewsCard;
