import React, { useState } from "react";
import "./LoginModal.css";
import "./ModalWithForm.css";
import ModalWithForm from "../Modals/ModalWithForm";

function LoginModal({ onSignIn, onClose, onSwitchToSignUp }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("LoginModal handleSubmit called", { email, password });
    if (onSignIn) {
      console.log("calling onsignin");
      onSignIn({ email, password });
    }
  };

  return (
    <ModalWithForm
      title="Sign In"
      onClose={onClose}
      onSubmit={handleSubmit}
      onSwitchToSignUp={onSwitchToSignUp}
    >
      <label>
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
      <label>
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
