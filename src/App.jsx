import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  // const [isModalOpen, setIsModalOpen] = useState(false);
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
    console.log("Opening Login Modal");
    setModalType("login");
    // setIsModalOpen(true);
  };

  const handleCloseLogin = () => setIsLoginOpen(false);

  const handleRegister = (data) => {
    console.log("Registering new user:", data);
    setIsLoggedIn(false); // User isn't logged in yet
    setCurrentUser({
      userName: data.name,
      email: data.email,
    });
    setModalType(""); // Close Register Modal
    setShowSuccessPopup(true); // Open Success Popup
  };

  const getKeywordFromArticle = (article) => {
    // use the search term or fallback to source name
    if (searchTerm) return searchTerm;
    if (article.source?.name) return article.source.name;
    return "Uncategorized";
  };

  const handleSaveArticle = (article) => {
    const articleWithKeyword = {
      ...article,
      keyword: searchTerm || article.source?.name || "Uncategorized",
    };

    console.log("Saving article:", articleWithKeyword);

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
    console.log("handleSignIn called with data:", data);

    if (data.email && data.password) {
      console.log("Valid data, signing in...");
      setIsLoggedIn(true);
      setCurrentUser({
        userName: data.userName || "Darilyn",
        email: data.email,
      });
      setModalType("");
    } else {
      console.log("Missing email or password");
      alert("Please enter both email and password.");
    }
  };

  const handleSignOut = () => {
    setIsLoggedIn(false);
  };

  const handleShowMore = () => {
    const nextCount = showMoreCount + 3;
    setVisibleArticles(articles.slice(0, nextCount));
    setShowMoreCount(nextCount);
  };

  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === "Escape") {
        // setIsModalOpen(false);
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

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
        );
        const data = await response.json();
        setArticles(data.articles);
        setVisibleArticles(data.articles.slice(0, 3));
      } catch (error) {
        console.error("Error fetching news:", error);
        setError("Failed to load articles");
      } finally {
        setLoading(false);
      }
    };
    console.log("this is firing when my app.jsx is mounted");
    fetchArticles();
  }, []);
  console.log("modalType in App.jsx:", modalType);

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
                    />
                    <Main
                      onSearch={handleSearchSubmit}
                      isLoggedIn={isLoggedIn}
                      onSignInClick={handleOpenLogin}
                      onSignOutClick={handleSignOut}
                      modalType={modalType}
                    />
                  </div>
                  {loading ? (
                    <Preloader />
                  ) : (
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
