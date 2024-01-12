import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPatient } from "../../redux/patientsSlice";
import { MedicHeader } from "../../components/MedicHeader";

export const MedicProfileScreen = () => {
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
    <div className="home-screen">
      <MedicHeader />
      <div className="home-screen-content">
        <h2>Add Patient</h2>
        <form>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="first_name"
              value={patientData.first_name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="last_name"
              value={patientData.last_name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Father Name:</label>
            <input
              type="text"
              name="father_name"
              value={patientData.father_name}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Gender:</label>
            <select
              name="gender"
              value={patientData.gender}
              onChange={handleInputChange}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div>
            <label>Phone Number:</label>
            <input
              type="text"
              name="phone_number"
              value={patientData.phone_number}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={patientData.email}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={patientData.password}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>License Number:</label>
            <input
              type="text"
              name="license_number"
              value={patientData.license_number}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <label>Health Description:</label>
            <textarea
              name="health_description"
              value={patientData.health_description}
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
