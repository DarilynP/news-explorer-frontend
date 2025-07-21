import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // fix import
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
  const [hovering, setHovering] = useState(false);
  const navigate = useNavigate(); // useNavigate correctly

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
    <li className="news__card"> {/* Use <li> for list item semantics within <ul> */}
      {/* Image Container with proper border-radius clipping */}
      <div className="news__card-image-container">
        {article.urlToImage && (
          <img
            src={article.urlToImage}
            alt={article.title}
            className="news__card-image"
          />
        )}
      </div>

      {/* Optional: Keyword Tag */}
      {article.keyword && (
        <span className="news__card-tag">{article.keyword}</span>
      )}

      {/* Save / Remove icon and Tooltip */}
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

        {/* Tooltip for non-logged-in users (conditionally rendered by React) */}
        {!isLoggedIn && hovering && (
          <div className="news__card-tooltip">Sign in to save article</div>
        )}
      </div>

      {/* Card Content Area (Flex column for internal layout) */}
      <div className="news__card-content">
        {/* Date */}
        <div className="news__card-date">
          <span className="news__card-date-month">{month}</span>
          <span className="news__card-date-day">{day},</span>
          <span className="news__card-date-year">{year}</span>
        </div>

        {/* Title */}
        <h2 className="news__card-title">
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            {article.title}
          </a>
        </h2>

        {/* Description */}
        <p className="news__card-description">
          {article.description?.slice(0, 100)}... {/* Truncate in JS or rely solely on CSS line-clamp */}
        </p>

        {/* Source / Footer (pushed to bottom by flex-grow on content) */}
        <div className="news__card-footer">
          <span>{article.source.name}</span>
        </div>
      </div>
    </li>
  );
}

export default NewsCard;
