import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Header from "./components/Header/Header";
import Navigation from "./components/Navigation/Navigation";
import SearchForm from "./components/SearchForm/SearchForm";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
import NewsCard from "./components/NewsCard/NewsCard.jsx";
import Main from "./components/Main/Main";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";
import LoginModal from "./components/Modals/LoginModal";
import Preloader from "./components/Preloader/Preloader";
import { getNews } from "./utils/ThirdPartyApi";
import "./index.css";
import RegisterModal from "./components/Modals/RegisterModal.jsx";
import CurrentUserContext from "./context/CurrentUserContext.jsx";
import NewsCardList from "./components/NewsCard/NewsCardList.jsx";
import SavedNews from "./components/SavedNews/SavedNews.jsx";
import SuccessPopup from "./components/Modals/SuccessPopup";
import "./App.css";

const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalType, setModalType] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [savedArticles, setSavedArticles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [articles, setArticles] = useState([]);
  const [visibleArticles, setVisibleArticles] = useState([]);
  const [error, setError] = useState("");
  const [showMoreCount, setShowMoreCount] = useState(3);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const handleSwitchToSignUp = () => setModalType("register");
  const handleSwitchToLogin = () => setModalType("login");
  const handleCloseModal = () => setModalType("");

  const handleOpenLogin = () => {
    setModalType("login");
  };

  const handleRegister = (data) => {
    setIsLoggedIn(false);
    setCurrentUser({
      userName: data.name,
      email: data.email,
    });
    setModalType("");
    setShowSuccessPopup(true);
  };

  const handleSaveArticle = (article) => {
    const articleWithKeyword = {
      ...article,
      keyword: searchTerm || article.source?.name || "Uncategorized",
    };

    setSavedArticles((prev) => {
      if (prev.some((a) => a.url === articleWithKeyword.url)) return prev;
      return [...prev, articleWithKeyword];
    });
  };

  const handleRemoveArticle = (article) => {
    setSavedArticles((prev) => prev.filter((a) => a.url !== article.url));
  };

  const handleSearchSubmit = (term) => {
    if (term.trim()) {
      setSearchTerm(term.trim());
      handleSearch(term.trim());
    }
  };

  const handleSearch = (term) => {
    setLoading(true);
    setTimeout(() => {
      const lowerTerm = term.toLowerCase();
      getNews(lowerTerm).then((articles) => {
        const filtered = articles.filter((article) => {
          const titleMatch = article.title.toLowerCase().includes(lowerTerm);
          const descriptionMatch =
            article.description &&
            article.description.toLowerCase().includes(lowerTerm);
          return titleMatch || descriptionMatch;
        });
        setVisibleArticles(filtered.slice(0, 3));
        setLoading(false);
      });
    }, 500);
  };

  const handleSignIn = (data) => {
    if (data.email && data.password) {
      setIsLoggedIn(true);
      setCurrentUser({
        userName: data.userName || "Darilyn",
        email: data.email,
      });
      setModalType("");
    } else {
      alert("Please enter both email and password.");
    }
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const handleShowMore = () => {
    const nextCount = showMoreCount + 3;
    setVisibleArticles(articles.slice(0, nextCount));
    setShowMoreCount(nextCount);
  };

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        setModalType("");
      }
    };

    if (modalType) {
      window.addEventListener("keydown", handleEscKey);
    }

    return () => {
      window.removeEventListener("keydown", handleEscKey);
    };
  }, [modalType]);
  console.log(isMobileMenuOpen);
  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
      <Router basename="/news-explorer-frontend">
        <div className="app">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Navigation />
                  <div className="app__wrapper">
                    <Header
                      isLoggedIn={isLoggedIn}
                      onSignInClick={handleOpenLogin}
                      onSignOutClick={handleSignOut}
                      modalType={modalType}
                      isMobileMenuOpen={isMobileMenuOpen}
                      setIsMobileMenuOpen={setIsMobileMenuOpen}
                    />

                    <Main
                      onSearch={handleSearchSubmit}
                      isLoggedIn={isLoggedIn}
                      onSignInClick={handleOpenLogin}
                      onSignOutClick={handleSignOut}
                      modalType={modalType}
                    />
                  </div>

                  {loading && <Preloader />}

                  {!loading && searchTerm && visibleArticles.length > 0 && (
                    <NewsCardList
                      articles={visibleArticles}
                      onShowMore={handleShowMore}
                      onSave={handleSaveArticle}
                      onRemove={handleRemoveArticle}
                      isLoggedIn={isLoggedIn}
                      savedArticles={savedArticles}
                      isSavedPage={false}
                      searchTerm={searchTerm}
                    />
                  )}

                  <About />
                </>
              }
            />

            <Route
              path="/saved-news"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <SavedNews
                    savedArticles={savedArticles}
                    onRemove={handleRemoveArticle}
                    isLoggedIn={isLoggedIn}
                    currentUser={currentUser}
                    onSignOutClick={handleSignOut}
                    onSignInSuccess={(user) => {
                      setIsLoggedIn(true);
                      setCurrentUser(user);
                    }}
                  />
                </ProtectedRoute>
              }
            />
          </Routes>

          <Footer />

          {modalType === "login" && (
            <LoginModal
              isModalOpen={true}
              onClose={handleCloseModal}
              onSwitchToSignUp={handleSwitchToSignUp}
              onSignIn={handleSignIn}
            />
          )}

          {modalType === "register" && (
            <RegisterModal
              isModalOpen={true}
              onClose={handleCloseModal}
              onSwitchToLogin={handleSwitchToLogin}
              onSubmit={handleRegister}
            />
          )}

          <SuccessPopup
            isOpen={showSuccessPopup}
            onClose={() => {
              setShowSuccessPopup(false);
              setModalType("login");
            }}
          />
        </div>
      </Router>
    </CurrentUserContext.Provider>
  );
}

export default App;
