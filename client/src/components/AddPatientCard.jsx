import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPatient } from "../redux/patientsSlice";

export const AddPatientCard = () => {
  const dispatch = useDispatch();

  const [patientData, setPatientData] = useState({
    first_name: "",
    last_name: "",
    father_name: "",
    gender: "",
    phone_number: "",
    email: "",
    password: "",
    license_number: "",
    health_description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddPatient = () => {
    dispatch(addPatient(patientData));
    setPatientData({
      first_name: "",
      last_name: "",
      father_name: "",
      gender: "",
      phone_number: "",
      email: "",
      password: "",
      license_number: "",
      health_description: "",
    });
  };

  return (
    <div className="add-patient-card">
      <div className="top">
        <h2>Add New Patient</h2>
      </div>
      <div className="bottom">
        <form>
          <div>
            <p>Gender and Name</p>
            <div className="row">
              {/* Here should be gender switch icon*/}
              <input
                type="text"
                name="last_name"
                value={patientData.last_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="row">
              <input
                type="text"
                name="first_name"
                value={patientData.first_name}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="father_name"
                value={patientData.father_name}
                onChange={handleInputChange}
              />
            </div>
            <p>Health Description</p>
            <textarea
              name="health_description"
              value={patientData.health_description}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <p>Registration</p>
            <input
              type="email"
              name="email"
              value={patientData.email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              value={patientData.password}
              onChange={handleInputChange}
            />
          </div>
          <button type="button" onClick={handleAddPatient}>
            Add Patient
          </button>
        </form>
      </div>
    </div>
  );
};
