import React from "react";

import { AddLicenseCard } from "../../components/AddLicenseCard";
import { MedicHeader } from "../../components/MedicHeader";
import LicensesList from "../../components/LicensesList";

export const MedicLicensesScreen = () => {
  return (
    <div className="licenses-screen">
      <MedicHeader />
      <div className="licenses-screen-content">
        <div className="add-license-card-container">
          <AddLicenseCard />
        </div>
        <div className="licenses-list-container">
          <LicensesList />
        </div>
      </div>
    </div>
  );
};
