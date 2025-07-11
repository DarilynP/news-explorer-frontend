import React from "react";
import "./Main.css";
import SearchForm from "../SearchForm/SearchForm";
import "../SearchForm/SearchForm.css";

function Main({ onSearch }) {
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
    </main>
  );
}

export default Main;
