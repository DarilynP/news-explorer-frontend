import React from "react";
import "./ModalWithForm.css";
import closeIcon from "../../assets/images/close.png";

function ModalWithForm({ title, children, onClose, onSubmit, onSwitchToSignUp}) {
  return (
    <div className="modal">
      <form className="modal__form" onSubmit={onSubmit}>
        <h2>{title}</h2>
        {children}
        <button type="submit" className="modal__submit-button">
          Sign In
        </button>
        <p className="modal__alt-link">
          or{" "}
          <button
            type="button"
            className="modal__alt-button"
            onClick={onSwitchToSignUp}
          >
            Sign Up
          </button>
        </p>
      </form>
      <button className="modal__close-button" onClick={onClose}></button>
    </div>
  );
}

export default ModalWithForm;
