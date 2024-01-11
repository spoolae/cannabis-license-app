import React from "react";
import useMedications from "../hooks/useMedications";

const MedicationRow = ({ medication, onRemove }) => {
  return (
    <tr key={medication.medication_id}>
      <td>{medication.vendor_code}</td>

      <td>
        <img src={medication.image_url} alt={medication.name} />
      </td>
      <td>{medication.name}</td>
      <td>
        <button
          onClick={() => onRemove(medication.medication_id)}
          aria-label="Remove Medication"
          className="remove-button"
        >
          Remove Medication
        </button>
      </td>
    </tr>
  );
};

const MedicationsTable = ({ medications, onRemove }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Vendor Code</th>

          <th>Image</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {medications.map((medication) => (
          <MedicationRow
            key={medication.medication_id}
            medication={medication}
            onRemove={onRemove}
          />
        ))}
      </tbody>
    </table>
  );
};

export const MedicationsList = () => {
  const { medications, removeMedication } = useMedications();

  const renderContent = () => {
    if (medications.length === 0) {
      return <h3 className="error-message">No medications available</h3>;
    } else {
      return (
        <MedicationsTable
          medications={medications}
          onRemove={removeMedication}
        />
      );
    }
  };

  return (
    <div className="medications-list">
      <h3 className="title">Medications List</h3>
      {renderContent()}
    </div>
  );
};

export default MedicationsList;
