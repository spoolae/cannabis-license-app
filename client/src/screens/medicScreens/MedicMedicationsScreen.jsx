import React from "react";
import { MedicHeader } from "../../components/MedicHeader";
import { AddMedicationCard } from "../../components/AddMedicationCard";
import MedicationsList from "../../components/MedicationsList";

export const MedicMedicationsScreen = () => {
  return (
    <div className="medications-screen">
      <MedicHeader />
      <div className="medications-screen-content">
        <div className="add-medication-card-container">
          <AddMedicationCard />
        </div>
        <div className="medications-list-container">
          <MedicationsList />
        </div>
      </div>
    </div>
  );
};
