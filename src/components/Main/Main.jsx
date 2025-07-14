import React from "react";
import "./Main.css";
import SearchForm from "../SearchForm/SearchForm";
import "../SearchForm/SearchForm.css";
function Main({ onSearch, children }) {
  return (
    <main className="main">
      <div className="main__p-wrapper">
        <p className="main__title">What's going on in the world?</p>
        <p className="main__subheading">
          Find the latest news on any topic and save them in your personal
          account
        </p>
        <SearchForm onSearchSubmit={onSearch} />
      </div>

      {/* Other main content that should appear before About */}
      <div className="main__content">
        {/* For example, the NewsCardList is outside Main, but you could move it here */}
      </div>

      {/* Render About at the bottom of the main section */}
      {children}
    </main>
  );
}

export default Main;
