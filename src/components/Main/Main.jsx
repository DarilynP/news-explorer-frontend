import React from "react";
import "./Main.css";
import SearchForm from "../SearchForm/SearchForm";
import "../SearchForm/SearchForm.css";

function Main({ onSearch, children }) {
  return (
    <main className="main">
      {/* Intro Section */}
      <section className="main__intro">
        <h2 className="main__heading">What's going on in the world?</h2>
        <p className="main__subheading">
          Find the latest news on any topic and save them in your personal
          account
        </p>
        <SearchForm onSearchSubmit={onSearch} />
      </section>

      {/* Main Content Section */}
      <section className="main__content">
        {/* For example, the NewsCardList could go here */}
      </section>

      {/* Render About or other children components */}
      {children}
    </main>
  );
}

export default Main;
