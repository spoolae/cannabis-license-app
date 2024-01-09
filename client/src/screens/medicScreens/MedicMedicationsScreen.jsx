import React from "react";
import { MedicHeader } from "../../components/MedicHeader";
import { AddMedicationCard } from "../../components/AddMedicationCard";

export const MedicMedicationsScreen = () => {
  return (
    <div>
      <MedicHeader />
      <div>
        <AddMedicationCard />
      </div>
    </div>
  );
};
