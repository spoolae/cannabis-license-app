import React from "react";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../redux/authSlice";

export const LoginTest = () => {
  const dispatch = useDispatch();

  const handleAuthentication = () => {
    dispatch(authenticateUser("john.doe@example2.com", "securepassword"));
  };

  return (
    <div>
      <h1>Login</h1>
      <button type="button" onClick={handleAuthentication}>
        Authenticate
      </button>
    </div>
  );
};
