import React, { useState } from "react";
import "./LoginModal.css";
import "./ModalWithForm.css";
import ModalWithForm from "../Modals/ModalWithForm";

function LoginModal({ onSignIn, onClose, onSwitchToSignUp, isModalOpen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const validatePassword = (value) => {
    return value.length >= 5; 
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!validateEmail(value)) {
      setErrors((prev) => ({ ...prev, email: "Enter a valid email address" }));
    } else {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    if (!validatePassword(value)) {
      setErrors((prev) => ({
        ...prev,
        password: "Password must be at least 5 characters",
      }));
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!errors.email && !errors.password && email && password) {
      onSignIn({ email, password });
    }
  };

  const isFormValid =
    email.trim() !== "" &&
    password.trim() !== "" &&
    !errors.email &&
    !errors.password;

  if (!isModalOpen) return null;

  return (
    <ModalWithForm
      isModalOpen={isModalOpen}
      title="Sign In"
      onClose={onClose}
      onSubmit={handleSubmit}
      onSwitchToSignUp={onSwitchToSignUp}
      type="login"
      isFormFilled={isFormValid}
    >
      <label className="login__form-label">
        Email
        <input
          type="email"
          value={email}
          placeholder="Enter Email"
          onChange={handleEmailChange}
          required
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </label>
      <label className="login__form-label--two">
        Password
        <input
          type="password"
          value={password}
          placeholder="Enter Password"
          onChange={handlePasswordChange}
          required
        />
        {errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
