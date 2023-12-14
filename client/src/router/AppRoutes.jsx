import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginScreen } from "../screens/authScreens/LoginScreen";
import { RegistrationScreen } from "../screens/authScreens/RegistrationScreen";
import { MedicHomeScreen } from "../screens/medicScreens/MedicHomeScreen";

export const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<MedicHomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/registration" element={<RegistrationScreen />} />
    </Routes>
  </Router>
);
