import React from "react";
import "./Main.css";
import Header from "../Header/Header";
import SearchForm from "../SearchForm/SearchForm";
import "../SearchForm/SearchForm.css";

function Main({
  onSearch,
  children,
  isLoggedIn,
  onSignInClick,
  onSignOutClick,
  modalType,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  setModalType
}) {
  return (
    <>
      <Header
        isLoggedIn={isLoggedIn}
        onSignInClick={onSignInClick}
        onSignOutClick={onSignOutClick}
        modalType={modalType}
        setModalType={setModalType} 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
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
    </>
  );
}

export default Main;
