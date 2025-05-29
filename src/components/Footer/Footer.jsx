import React from "react";
import "./Footer.css";
import fb from "../../assets/images/fb.png";
import github from "../../assets/images/github.png";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__container">
      <p className="footer__p">© 2024 Supersite, Powered by News API</p>
      <p className="footer__tag">TripleTen</p>
      <button type="button" className="footer__home-button">Home</button>
      <img src={fb} alt="fb logo" className="logo__image-fb" />
      <img src={github} alt="github logo" className="logo__image-github" />
      </div>
    </footer>
  );
}

export default Footer;
