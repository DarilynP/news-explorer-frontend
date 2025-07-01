import React from "react";
import "./ModalWithForm.css";

function ModalWithForm({
  title,
  children,
  onClose,
  onSubmit,
  onSwitchToSignUp,
  type = "default",
  isModalOpen,
}) {
  console.log("ModalWithForm render, isModalOpen =", isModalOpen);

  if (!isModalOpen) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <div
        className={`modal modal_type_${type}`} 
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
      >
        <form className="modal__form" onSubmit={onSubmit}>
          <h2 className="modal__title">{title}</h2>
          {children}
          <button type="submit" className="modal__submit-button">
            {type === "register" ? "Sign Up" : "Sign In"}
          </button>
          {type === "login" && (
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
          )}
        </form>
        <button className="modal__close-button" onClick={onClose}>
      
        </button>
      </div>
    </div>
  );
}

export default ModalWithForm;