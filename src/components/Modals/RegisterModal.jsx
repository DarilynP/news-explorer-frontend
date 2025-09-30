import React, { useState } from "react";
import "./RegisterModal.css";
import ModalWithForm from "./ModalWithForm";

function RegisterModal({
  onClose,
  onSubmit,
  isModalOpen,
  onSwitchToLogin, // 👈 for switching back
}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    username: "",
  });

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const validatePassword = (value) => {
    return value.length >= 6; // Require at least 6 characters
  };

  const validateUsername = (value) => {
    return value.trim().length >= 2; // Require at least 2 characters
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    if (!validateEmail(value)) {
      setErrors((prev) => ({
        ...prev,
        email: "Enter a valid email address",
      }));
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
        password: "Password must be at least 6 characters",
      }));
    } else {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);

    if (!validateUsername(value)) {
      setErrors((prev) => ({
        ...prev,
        username: "Username must be at least 2 characters",
      }));
    } else {
      setErrors((prev) => ({ ...prev, username: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !errors.email &&
      !errors.password &&
      !errors.username &&
      email &&
      password &&
      username
    ) {
      onSubmit({ email, password, username });
    }
  };

  const isFormValid =
    email.trim() !== "" &&
    password.trim() !== "" &&
    username.trim() !== "" &&
    !errors.email &&
    !errors.password &&
    !errors.username;

  if (!isModalOpen) return null;

  return (
    <ModalWithForm
      isModalOpen={true}
      title="Sign Up"
      onClose={onClose}
      onSubmit={handleSubmit}
      onSwitchToLogin={onSwitchToLogin}
      type="register"
      isFormFilled={isFormValid}
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          value={email}
          placeholder="Enter Email"
          onChange={handleEmailChange}
          required
          className="modal__input"
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </label>

      <label className="modal__label">
        Password
        <input
          type="password"
          value={password}
          placeholder="Enter Password"
          onChange={handlePasswordChange}
          required
          className="modal__input"
        />
        {errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>

      <label className="modal__label">
        Username
        <input
          type="text"
          value={username}
          placeholder="Enter your username"
          onChange={handleUsernameChange}
          required
          className="modal__input"
        />
        {errors.username && (
          <span className="modal__error">{errors.username}</span>
        )}
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
