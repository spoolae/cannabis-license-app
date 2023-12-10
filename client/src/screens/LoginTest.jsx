import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { authenticateUser, checkAuthentication } from "../redux/authSlice";

export const LoginTest = () => {
  const dispatch = useDispatch();

  const handleAuthentication = () => {
    dispatch(authenticateUser("john.doe@example.com", "securepassword"));
  };

  useEffect(() => {
    const isAuthenticated = dispatch(checkAuthentication());
    console.log("Is Authenticated:", isAuthenticated);
  }, [dispatch]);

  return (
    <div>
      <h1>Login</h1>
      <button type="button" onClick={handleAuthentication}>
        Authenticate
      </button>
    </div>
  );
};
