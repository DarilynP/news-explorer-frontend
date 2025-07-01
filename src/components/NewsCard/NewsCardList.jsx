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
    <section className="News__Section">
      <section className="results">
        <h3 className="results__title">Search results</h3>
      </section>
      <div className="news-card-list">
        {articles.map((article, index) => {
          const isSaved = savedArticles.some(
            (saved) => saved.url === article.url
          );

          return (
            <NewsCard
              key={index}
              article={article}
              isSaved={isSaved}
              isLoggedIn={isLoggedIn}
              onSave={onSave}
              onRemove={onRemove}
              isSavedPage={isSavedPage}
            />
          );
        })}
      </div>

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
