import React, { useState } from "react";
import "./RegisterModal.css";
import ModalWithForm from "./ModalWithForm";

function RegisterModal({ onClose, onSubmit, isModalOpen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ email, password, username });
    console.log("Registering:", { email, password, username });
  };
  if (!isModalOpen) return null;
  const isFormFilled = email.trim() !== "" && password.trim() !== "";

  return (
    <ModalWithForm
      isModalOpen={true}
      title="Sign Up"
      onClose={onClose}
      onSubmit={handleSubmit}
      // className="modal__register"
      type="register"
      isFormFilled={isFormFilled}
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          value={email}
          placeholder="Enter Email"
          onChange={(e) => setEmail(e.target.value)}
          required
          className="modal__input"
        />
      </label>
      <label className="modal__label">
        Password
        <input
          type="password"
          value={password}
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
          required
          className="modal__input"
        />
      </label>
      <label className="modal__label">
        Username
        <input
          type="text"
          value={username}
          placeholder="Enter your username"
          onChange={(e) => setUsername(e.target.value)}
          required
          className="modal__input"
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;
