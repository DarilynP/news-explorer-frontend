import React, { useState } from "react";
import "./LoginModal.css";
import "./ModalWithForm.css";
import ModalWithForm from "../Modals/ModalWithForm";

function LoginModal({ onSignIn, onClose, onSwitchToSignUp, isModalOpen }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  if (!isModalOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(" handleSubmit fired in LoginModal!");
    console.log("Email:", email);
    console.log(" Password:", password);

    if (onSignIn) {
      console.log(" Calling onSignIn with:", { email, password });
      onSignIn({ email, password });
    } else {
      console.log(" No onSignIn prop provided!");
    }
  };
  const isFormFilled = email.trim() !== "" && password.trim() !== "";

  return (
    <ModalWithForm
      isModalOpen={isModalOpen}
      title="Sign In"
      onClose={onClose}
      onSubmit={handleSubmit}
      onSwitchToSignUp={onSwitchToSignUp}
      type="login"
      isFormFilled={isFormFilled}
    >
      <label className="form__label">
        Email
        <input
          type="email"
          value={email}
          placeholder="Enter Email"
          onChange={(e) => {
            setEmail(e.target.value);
            console.log("Email changed:", e.target.value);
          }}
          required
        />
      </label>
      <label className="form__label">
        Password
        <input
          type="password"
          value={password}
          placeholder="Enter Password"
          onChange={(e) => {
            setPassword(e.target.value);
            console.log("Password changed:", e.target.value);
          }}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
