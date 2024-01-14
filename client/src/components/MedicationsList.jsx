import React from "react";
import useMedications from "../hooks/useMedications";

export const MedicationsList = () => {
  const { medications, removeMedication } = useMedications();

  return (
    <div className="medications-list">
      <h3 className="title">Medications List</h3>
      <div className="list-content">
        <ul>
          {medications.map((medication) => (
            <li key={medication.medication_id}>
              <div className="group-left">
                <div>
                  <img src={medication.image_url} alt={medication.name} />
                </div>
                <div>
                  <h5>{medication.vendor_code}</h5>
                  <p>{medication.name}</p>
                </div>
              </div>

              <button
                onClick={() => removeMedication(medication.medication_id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MedicationsList;
