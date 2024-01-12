import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPatient } from "../redux/patientsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";

export const AddPatientCard = () => {
  const dispatch = useDispatch();

  const [patientData, setPatientData] = useState({
    first_name: "",
    last_name: "",
    father_name: "",
    gender: "male",
    phone_number: "",
    email: "",
    password: "",
    confirmPassword: "", // Новое поле для подтверждения пароля
    health_description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPatientData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleGenderChange = () => {
    setPatientData((prevData) => ({
      ...prevData,
      gender: prevData.gender === "male" ? "female" : "male",
    }));
  };

  const handleAddPatient = () => {
    dispatch(addPatient(patientData));
    setPatientData({
      first_name: "",
      last_name: "",
      father_name: "",
      gender: "male",
      phone_number: "",
      email: "",
      password: "",
      confirmPassword: "",
      health_description: "",
    });
  };

  return (
    <div className="add-patient-card">
      <div className="top">
        <h3>Add New Patient</h3>
      </div>
      <div className="bottom">
        <form className="patient-form">
          <div>
            <p>About Patient</p>
            <div className="row">
              <FontAwesomeIcon
                icon={patientData.gender === "male" ? faMars : faVenus}
                onClick={handleGenderChange}
                className="gender-icon"
              />
              <input
                type="text"
                name="last_name"
                value={patientData.last_name}
                onChange={handleInputChange}
                placeholder="Last Name"
              />
            </div>
            <div className="row">
              <input
                type="text"
                name="first_name"
                value={patientData.first_name}
                onChange={handleInputChange}
                placeholder="First Name"
              />
              <input
                type="text"
                name="father_name"
                value={patientData.father_name}
                onChange={handleInputChange}
                placeholder="Father Name"
              />
            </div>
            <textarea
              name="health_description"
              value={patientData.health_description}
              onChange={handleInputChange}
              placeholder="Short description of the patient and his health issues"
            />
          </div>
          <div>
            <p>Registration</p>
            <input
              type="email"
              name="email"
              value={patientData.email}
              onChange={handleInputChange}
              placeholder="Email"
            />
            <input
              type="password"
              name="password"
              value={patientData.password}
              onChange={handleInputChange}
              placeholder="Password"
            />
            <input
              type="password"
              name="confirmPassword"
              value={patientData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm Password"
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
