import React from "react";
import NewsCard from "./NewsCard";

function NewsCardList({
  articles = [],
  onShowMore,
  onSave,
  onRemove,
  savedArticles = [],
  isLoggedIn,
  isSavedPage,
  searchTerm = "",
}) {
  // Filter articles based on searchTerm
  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const noResults = searchTerm && filteredArticles.length === 0;

  if (noResults) {
    return <section className="no-articles"></section>;
  }

  return (
    <section className="news">
      <header className="news__header">
        <h3 className="news__title">Search results</h3>
      </header>

      <ul className="news__list">
        {filteredArticles.map((article, index) => {
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

      {filteredArticles.length > 0 && !isSavedPage && (
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
