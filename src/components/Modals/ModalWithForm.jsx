import React from "react";
import "./ModalWithForm.css";

function ModalWithForm({
  title,
  children,
  onClose,
  onSubmit,
  onSwitchToSignUp,
  onSwitchToLogin,
  type = "default",
  isModalOpen,
  isFormFilled,
}) {
  console.log("ModalWithForm render, isModalOpen =", isModalOpen);

  // Don’t render anything if modal is closed
  if (!isModalOpen) return null;
  console.log("ModalWithForm render, isModalOpen =", isModalOpen);
  console.log("ModalWithForm render, onSubmit =", onSubmit);

  return (
    <div
      className={`modal__overlay ${isModalOpen ? "modal__overlay_active" : ""}`}
      onClick={onClose}
    >
      <div
        className={`modal modal_type_${type}`}
        onClick={(e) => e.stopPropagation()} 
      >
        <form className="modal__form" onSubmit={onSubmit}>
          <h2 className="modal__title">{title}</h2>
          {children}

          {/* Submit button */}
          <button
            type="submit"
            className={`modal__submit-button ${
              isFormFilled ? "modal__submit-button_active" : ""
            }`}
            
          >
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
          {type === "register" && (
            <p className="modal__alt-link">
              or{" "}
              <button
                type="button"
                className="modal__alt-button"
                onClick={onSwitchToLogin}
              >
                Sign In
              </button>
            </p>
          )}
        </form>
        <button
          className="modal__close-button"
          onClick={onClose}
          aria-label="Close modal"
        ></button>
      </div>
    </div>
  );
}

export default ModalWithForm;
