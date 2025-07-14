import React from "react";
import NewsCard from "./NewsCard";
import nothing_found from "../../assets/images/nothing_found.png";

function NewsCardList({
  articles,
  onShowMore,
  onSave,
  onRemove,
  savedArticles = [],
  isLoggedIn,
  isSavedPage,
  searchTerm = "",
}) {
  const noArticles = !articles || articles.length === 0;

  if (searchTerm.trim() && noArticles) {
    return (
      <section className="no-articles">
        <img
          src={nothing_found}
          alt="No articles found"
          className="no-articles__image"
        />
      </section>
    );
  }

  if (noArticles) {
    return null;
  }

  return (
    <section className="news">
      <header className="news__header">
        <h3 className="news__title">Search results</h3>
      </header>

      <ul className="news__list">
        {articles.map((article, index) => {
          const isSaved = savedArticles.some(
            (saved) => saved.url === article.url
          );

          return (
            <li key={index} className="news__list-item">
              <NewsCard
                article={article}
                isSaved={isSaved}
                isLoggedIn={isLoggedIn}
                onSave={onSave}
                onRemove={onRemove}
                isSavedPage={isSavedPage}
              />
            </li>
          );
        })}
      </ul>

      {articles.length > 0 && !isSavedPage && (
        <div className="news__button-container">
          <button className="news__button" onClick={onShowMore}>
            Show More
          </button>
        </div>
      )}
    </section>
  );
}

export default NewsCardList;
