import React from "react";

import { AddLicenseCard } from "../../components/AddLicenseCard";
import { MedicHeader } from "../../components/MedicHeader";
import LicensesList from "../../components/LicensesList";

export const MedicHomeScreen = () => {
  return (
    <div className="home-screen">
      <MedicHeader />
      <div className="add-license-card-container">
        <AddLicenseCard />
      </div>
      <div className="licenses-list-container">
        <LicensesList />
      </div>
    </div>
  );
};
