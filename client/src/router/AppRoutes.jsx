import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkAuthentication } from "../redux/authSlice";
import { LoginTest } from "../screens/LoginTest";
import { HomeTest } from "../screens/HomeTest";
import LoginScreen from "../screens/LoginScreen";

const PrivateRoute = ({ element, path }) => {
  const dispatch = useDispatch();
  const isAuthenticated = dispatch(checkAuthentication());
  return isAuthenticated ? element : <Navigate to="/" />;
};

export const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/logintest" element={<LoginTest />} />
      <Route
        path="/hometest"
        element={<PrivateRoute element={<HomeTest />} path="/hometest" />}
      />
    </Routes>
  </Router>
);
