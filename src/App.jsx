import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import Header from "./components/Header/Header";
import Navigation from "./components/Navigation/Navigation";
import SearchForm from "./components/SearchForm/SearchForm";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";

import Main from "./components/Main/Main";
import About from "./components/About/About";
import Footer from "./components/Footer/Footer";
import LoginModal from "./components/Modals/LoginModal";

import "./index.css";
import RegisterModal from "./components/Modals/RegisterModal.jsx";

// placeholder SavedNews page
function SavedNews() {
  return <div>Saved News Page</div>;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [modalType, setModalType] = useState("login"); // 'login' or 'register'
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const handleSwitchToSignUp = () => setModalType("register");
  const handleSwitchToLogin = () => setModalType("login");
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenLogin = () => {
    console.log("handleOpenLogin called");
    setModalType("login");
    setIsModalOpen(true);
  };


  const handleCloseLogin = () => setIsLoginOpen(false);


  const handleSearch = (term) => {
    console.log("search for:", term);
  };

  const handleSignIn = (data) => {
    console.log("sign in data:", data);

    setIsLoginOpen(false);
  };

  return (
    <Router>
      <div className="app">
        <Header isLoggedIn={isLoggedIn} onSignInClick={handleOpenLogin} />

        {/* <nav>
          <Link to="/">Home</Link>
          {" | "}
          <Link to="/saved-news">Saved News</Link>
        </nav> */}

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navigation />
                <SearchForm onSearch={handleSearch} />
                <Main />
                <About />
              </>
            }
          />

          <Route
            path="/saved-news"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <SavedNews />
              </ProtectedRoute>
            }
          />
        </Routes>

        <Footer />

        {isModalOpen && modalType === "login" && (
          <LoginModal
            onClose={handleCloseModal}
            onSwitchToSignUp={handleSwitchToSignUp}
            onSignIn={handleSignIn}

          />
        )}

        {isModalOpen && modalType === "register" && (
          <RegisterModal
            onClose={handleCloseModal}
            onSwitchToLogin={handleSwitchToLogin}
          />
        )}
      </div>
    </Router>
  );
}

export default App;
