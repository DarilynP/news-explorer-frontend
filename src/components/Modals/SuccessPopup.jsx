import { Link } from "react-router-dom";
import React from "react";
import "./SuccessPopup.css";

function SuccessPopup({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="popup">
      <div className="popup__container">
        <h3 className="popup__title">Registration successfully completed!</h3>
        <button className="popup__close" onClick={onClose}></button>
        <Link to="/" className="popup__signin-link" onClick={onClose}>
          Sign in 
        </Link>
      </div>
    </div>
  );
}

export default SuccessPopup;
