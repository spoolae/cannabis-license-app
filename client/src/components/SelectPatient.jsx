import React, { useRef } from "react";
import { handlePatientChange, handleSearchChange } from "../utils";

export const SelectPatient = ({
  searchTerm,
  patients,
  isDropdownVisible,
  setSearchTerm,
  setDropdownVisible,
  setSelectedPatient,
}) => {
  const dropdownRef = useRef(null);

  return (
    <>
      <input
        className="custom-select"
        type="text"
        value={searchTerm}
        onChange={(event) =>
          handleSearchChange(event, patients, setSearchTerm, setDropdownVisible)
        }
        placeholder="Search for a patient"
      />
      {isDropdownVisible && (
        <div ref={dropdownRef} className="select-options">
          {patients.map((patient) => (
            <p
              key={patient.patient_id}
              value={patient.patient_id}
              onClick={() =>
                handlePatientChange(
                  { target: { value: patient.patient_id } },
                  patients,
                  setSelectedPatient,
                  setSearchTerm,
                  setDropdownVisible
                )
              }
            >
              {`${patient.last_name} ${patient.first_name} ${patient.father_name}`}
            </p>
          ))}
        </div>
      )}
    </>
  );
};
