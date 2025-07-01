import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import fb from "../../assets/images/fb.png";
import github from "../../assets/images/github.png";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">© 2024 Supersite, Powered by News API</p>
      <div className="footer__container">
        <div className="logo__container">
          <Link to="/" className="footer__link">
            Home
          </Link>
          <p className="footer__tag">TripleTen</p>
        </div>
        <nav className="footer__nav">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__icon-link"
          >
            <img src={github} alt="GitHub logo" className="footer__icon" />
          </a>
          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__icon-link"
          >
            <img src={fb} alt="Facebook logo" className="footer__icon" />
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
