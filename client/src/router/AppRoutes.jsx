import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { LoginScreen } from "../screens/authScreens/LoginScreen";
import { RegistrationScreen } from "../screens/authScreens/RegistrationScreen";
import { MedicLicensesScreen } from "../screens/medicScreens/MedicLicensesScreen";
import { MedicProfileScreen } from "../screens/medicScreens/MedicProfileScreen";
import { MedicPatientsScreen } from "../screens/medicScreens/MedicPatiensScreen";
import { MedicMedicationsScreen } from "../screens/medicScreens/MedicMedicationsScreen";

export const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/" element={<MedicLicensesScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/registration" element={<RegistrationScreen />} />
      <Route path="/medic/profile" element={<MedicProfileScreen />} />
      <Route path="/medic/licenses" element={<MedicLicensesScreen />} />
      <Route path="/medic/patients" element={<MedicPatientsScreen />} />
      <Route path="/medic/medications" element={<MedicMedicationsScreen />} />
    </Routes>
  </Router>
);
