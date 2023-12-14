import React, { useState, useEffect, useRef } from "react";
import weedBud from "../../assets/images/weedBud.png";
import avatar from "../../assets/images/avatar.png";
import calendar from "../../assets/images/calendar.png";
import plus from "../../assets/images/plus.png";

export const MedicHomeScreen = () => {
  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("3");
  const [searchTerm, setSearchTerm] = useState("");
  const [patients, setPatients] = useState([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/patients/search?searchTerm=${searchTerm}`
        );
        const data = await response.json();
        setPatients(data);
        setDropdownVisible(!!searchTerm && data.length > 0);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handlePatientChange = (event) => {
    const selectedPatientId = event.target.value;
    const selectedPatient = patients.find(
      (patient) => patient.patient_id === selectedPatientId
    );

    if (selectedPatient) {
      const fullName = `${selectedPatient.last_name} ${selectedPatient.first_name} ${selectedPatient.father_name}`;
      setSelectedPatient(selectedPatientId);
      setSearchTerm(fullName);
    } else {
      setSelectedPatient("");
      setSearchTerm("");
    }
    setDropdownVisible(false);
  };

  const handleDurationChange = (event) => {
    const selectedDurationValue = event.target.value;
    setSelectedDuration(selectedDurationValue);
  };

  const handleSearchChange = (event) => {
    const searchValue = event.target.value;
    setSearchTerm(searchValue);
    setDropdownVisible(!!searchValue && patients.length > 0);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Выбранный пациент:", selectedPatient);
    console.log("Выбранная длительность:", selectedDuration);
  };

  return (
    <div className="home-screen">
      <div className="license-card">
        <img src={weedBud} alt="Weed bud" />
        <form className="content">
          <div className="leftSide">
            <div />
            <div />
            <div />
            <div />
            <div />
          </div>
          <div className="rightSide">
            <h3>Create a new license</h3>
            <div>
              <img src={avatar} alt="Avatar" />
              <p>Select a patient to create a license</p>
              <input
                className="custom-select"
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search for a patient"
              />
              {isDropdownVisible && (
                <div ref={dropdownRef} className="select-options">
                  {patients.map((patient) => (
                    <p
                      key={patient.patient_id}
                      value={patient.patient_id}
                      onClick={() =>
                        handlePatientChange({
                          target: { value: patient.patient_id },
                        })
                      }
                    >
                      {`${patient.last_name} ${patient.first_name} ${patient.father_name}`}
                    </p>
                  ))}
                </div>
              )}
            </div>

            <div>
              <img src={calendar} alt="Calendar" />
              <p>Select duration of license</p>
              <select value={selectedDuration} onChange={handleDurationChange}>
                <option value="3">3 Months</option>
                <option value="6">6 Months</option>
                <option value="12">12 Months</option>
              </select>
            </div>
            <div>
              <img
                id="plus"
                onClick={handleSubmit}
                src={plus}
                alt="Plus"
                className=""
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
