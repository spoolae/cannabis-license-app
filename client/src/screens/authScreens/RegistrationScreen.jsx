import React, { useState } from "react";
import { Link } from "react-router-dom";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RegistrationScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    if (!/\S+@\S+\.\S+/.test(value)) {
      setEmailError("Incorrect email format");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    if (value.length < 6) {
      setPasswordError("Password should be at least 6 characters");
    } else {
      setPasswordError("");
    }
  };

  const handleConfirmPasswordChange = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    if (value !== password) {
      setConfirmPasswordError("Passwords do not match");
    } else {
      setConfirmPasswordError("");
    }
  };

  const handleRegistration = () => {
    if (!emailError && !passwordError && !confirmPasswordError) {
      console.log("Registration successful");
    } else {
      console.log("Registration error. Please fix the form errors.");
    }
  };

  return (
    <div className="registration-screen">
      <div className="card">
        <h2>Create New Account</h2>
        <div>
          <FontAwesomeIcon
            icon={faEnvelope}
            className={emailError ? "icon" : "icon green"}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        {emailError && <label className="error-message">{emailError}</label>}
        <div>
          <FontAwesomeIcon
            icon={faLock}
            className={passwordError ? "icon" : "icon green"}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        {passwordError && (
          <label className="error-message">{passwordError}</label>
        )}
        <div>
          <FontAwesomeIcon
            icon={faLock}
            className={confirmPasswordError ? "icon" : "icon green"}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        {confirmPasswordError && (
          <label className="error-message">{confirmPasswordError}</label>
        )}
        <button onClick={handleRegistration}>Register</button>
        <p>
          Already have an account? <Link to="/login">Login</Link>.
        </p>
      </div>
    </div>
  );
};

export default RegistrationScreen;
