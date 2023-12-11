import React, { useState } from "react";
import { Link } from "react-router-dom";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = () => {
    console.log("Вход выполнен");
  };

  return (
    <div className="login-screen">
      <div className="card">
        <h2>Login To Your Account!</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <br />
        <button onClick={handleLogin}>Увійти</button>

        <p>
          Not registered yet? <Link to="/registration">Sign-up</Link>.
        </p>
      </div>
    </div>
  );
};

export default LoginScreen;
