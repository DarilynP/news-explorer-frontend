import React, { useContext, useState } from "react";
import "./NewsCard.css";
import saveTag from "../../assets/images/save_tag.png";
import savedTag from "../../assets/images/saved_tag.png";
import CurrentUserContext from "../../context/CurrentUserContext";
import trash_icon from "../../assets/images/trash_icon.png";

function NewsCard({ article, isSaved, isLoggedIn, onSave, onRemove, isSavedPage }) {
  const { currentUser } = useContext(CurrentUserContext);
  const [hovering, setHovering] = useState(false);

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
      onRemove(article);
    } else {
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
      {article.keyword && <span className="news__card-tag">{article.keyword}</span>}

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

      {/* Save / Remove icon with tooltip on hover */}
      <div
        className="news__card-save-wrapper"
        onClick={handleSaveClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && handleSaveClick()}
        onMouseEnter={() => !isLoggedIn && setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <img
          src={isSavedPage ? trash_icon : isSaved ? savedTag : saveTag}
          alt={isSavedPage ? "Remove" : isSaved ? "Saved" : "Save"}
          className="news__card-save-icon"
        />

        {!isLoggedIn && hovering && (
          <div className="news__card-tooltip">
            Sign in to save article
          </div>
        )}
      </div>
    </div>
  );
}

export default NewsCard;
