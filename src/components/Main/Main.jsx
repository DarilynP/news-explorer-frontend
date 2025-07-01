import React from "react";
import "./Main.css";
import SearchForm from "../SearchForm/SearchForm";
import "../SearchForm/SearchForm.css";
import Header from "../Header/Header";

function Main({
  handleSearch,
  onSearch,
  isLoggedIn,
  onSignInClick,
  onSignOutClick,
  modalType
}) {
  return (
    <main className="main">
      <Header
        isLoggedIn={isLoggedIn}
        onSignInClick={onSignInClick}
        onSignOutClick={onSignOutClick}
        modalType={modalType}
      />

      <div className="main__p-wrapper">
        <p className="main__heading">What's going on in the world?</p>
        <p className="main__subheading">
          Find the latest news on any topic and save them in your personal
          account
        </p>
        <SearchForm onSearchSubmit={onSearch} />
        {/* <section className="results">
    <h3 className="results__title">Search results</h3>
    </section> */}
      </div>
    </main>
  );
}

export default Main;
