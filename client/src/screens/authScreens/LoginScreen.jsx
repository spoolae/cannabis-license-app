import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../../redux/authSlice";

export const LoginScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

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

  const handleLogin = async () => {
    if (!emailError && !passwordError) {
      try {
        await dispatch(authenticateUser(email, password));
        console.log("Login successful");
        navigate("/medic/licenses");
      } catch (error) {
        console.log("Login error. Please fix the form errors.");
      }
    } else {
      console.log("Login error. Please fix the form errors.");
    }
  };

  return (
    <div className="login-screen">
      <div className="card">
        <h2>Login To Your Account</h2>
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
        <button onClick={handleLogin}>Login</button>
        <p>
          Not registered yet? <Link to="/registration">Sign-up</Link>.
        </p>
      </div>
    </div>
  );
};
