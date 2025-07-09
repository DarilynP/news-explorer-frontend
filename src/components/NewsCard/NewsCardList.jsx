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
      <section className="no__articles">
        <img
          src={nothing_found}
          alt="No articles found"
          className="no__articles-image"
        />
      </section>
    );
  }

  if (noArticles) {
    return null;
  }

  return (
    <section className="news__section">
      <header className="results">
        <h3 className="results__title">Search results</h3>
      </header>

      <ul className="news__card-list">
        {articles.map((article, index) => {
          const isSaved = savedArticles.some(
            (saved) => saved.url === article.url
          );

          return (
            <li key={index} className="news__card-list_item">
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
        <div className="button__container">
          <button className="news__card-button" onClick={onShowMore}>
            Show More
          </button>
        </div>
      )}
    </section>
  );
}

export default NewsCardList;
