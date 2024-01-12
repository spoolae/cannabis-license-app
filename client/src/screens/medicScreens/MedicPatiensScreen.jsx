import React from "react";
import { MedicHeader } from "../../components/MedicHeader";
import { AddPatientCard } from "../../components/AddPatientCard";

export const MedicPatientsScreen = () => {
  return (
    <div className="patients-screen">
      <MedicHeader />
      <div className="patients-screen-content">
        <div className="add-patient-card-container">
          <AddPatientCard />
        </div>
      </div>
    </div>
  );
};
