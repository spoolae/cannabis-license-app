import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginScreen from "../screens/authScreens/LoginScreen";
import RegistrationScreen from "../screens/authScreens/RegistrationScreen";

export const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<RegistrationScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/registration" element={<RegistrationScreen />} />
    </Routes>
  </Router>
);
