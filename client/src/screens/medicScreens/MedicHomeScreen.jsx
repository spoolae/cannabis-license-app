import React, { useState } from "react";
import weedBud from "../../assets/images/weedBud.png";
import avatar from "../../assets/images/avatar.png";
import calendar from "../../assets/images/calendar.png";
import plus from "../../assets/images/plus.png";

export const MedicHomeScreen = () => {
  const [selectedPatient, setSelectedPatient] = useState(""); // Состояние для выбранного пациента
  const [selectedDuration, setSelectedDuration] = useState(""); // Состояние для выбранной длительности

  const handlePatientChange = (event) => {
    setSelectedPatient(event.target.value);
  };

  const handleDurationChange = (event) => {
    setSelectedDuration(event.target.value);
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
              <select value={selectedPatient} onChange={handlePatientChange}>
                <option value="patient1">Patient 1</option>
                <option value="patient2">Patient 2</option>
              </select>
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
              <img id="plus" src={plus} alt="Plus" className="" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
