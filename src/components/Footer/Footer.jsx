import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import fb from "../../assets/images/fb.png";
import github from "../../assets/images/github.png";

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__copyright">© 2024 Supersite, Powered by News API</p>

      <section className="footer__container">
        {/* Navigation Links */}
        <nav className="footer__nav-links">
          <Link to="/" className="footer__link">
            Home
          </Link>
          <a
            href="https://tripleten.com"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__tag"
          >
            TripleTen
          </a>
        </nav>

        {/* Social Links */}
        <nav className="footer__social">
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
      </section>
    </footer>
  );
}

export default Footer;
