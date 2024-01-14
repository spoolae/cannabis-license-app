import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { addPatient } from "../redux/patientsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const AddPatientCard = () => {
  const dispatch = useDispatch();
  const sliderRef = useRef(null);

  const [patientData, setPatientData] = useState({
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
    sliderRef.current.slickPrev();
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

  const handleNext = () => {
    sliderRef.current.slickNext();
  };

  const sliderSettings = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: false,
  };

  return (
    <div className="add-patient-card">
      <div className="top">
        <h3>Add New Patient</h3>
      </div>
      <div className="bottom">
        <Slider {...sliderSettings} ref={sliderRef}>
          <div>
            <RegistrationForm
              patientData={patientData}
              handleInputChange={handleInputChange}
              handleNext={handleNext}
            />
          </div>
          <div>
            <AboutPatientForm
              patientData={patientData}
              handleInputChange={handleInputChange}
              handleGenderChange={handleGenderChange}
              handleAddPatient={handleAddPatient}
            />
          </div>
        </Slider>
      </div>
    </div>
  );
};

const RegistrationForm = ({ patientData, handleInputChange, handleNext }) => {
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { ...errors };

    if (!patientData.email || !patientData.email.includes("@")) {
      newErrors.email = "Invalid email address";
      isValid = false;
    } else {
      newErrors.email = "";
    }

    if (!patientData.password || patientData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long";
      isValid = false;
    } else {
      newErrors.password = "";
    }

    if (patientData.password !== patientData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    } else {
      newErrors.confirmPassword = "";
    }

    setErrors(newErrors);

    return isValid;
  };

  const handleNextClick = () => {
    if (validateForm()) {
      handleNext();
    }
  };

  return (
    <form className="patient-form">
      <div>
        <p className="slide-label">
          Registration <span>1/2</span>
        </p>

        <div className="form-row">
          <label>Enter patient's email</label>
          <input
            type="email"
            name="email"
            value={patientData.email}
            onChange={handleInputChange}
            placeholder="Email"
          />
          {errors.email && (
            <span className="error-message">{errors.email}</span>
          )}
        </div>
        <div className="form-row">
          <label>Enter patient's password</label>
          <input
            type="password"
            name="password"
            value={patientData.password}
            onChange={handleInputChange}
            placeholder="Password"
          />
          {errors.password && (
            <span className="error-message">{errors.password}</span>
          )}
        </div>
        <div className="form-row">
          <label>Repeat password</label>
          <input
            type="password"
            name="confirmPassword"
            value={patientData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Confirm Password"
          />
          {errors.confirmPassword && (
            <span className="error-message">{errors.confirmPassword}</span>
          )}
        </div>
      </div>
      <button type="button" onClick={handleNextClick}>
        Next
      </button>
    </form>
  );
};

const AboutPatientForm = ({
  patientData,
  handleInputChange,
  handleGenderChange,
  handleAddPatient,
}) => {
  return (
    <form className="patient-form">
      <div>
        <p className="slide-label">About Patient</p>
        <div className="form-inputs">
          <div className="row">
            <FontAwesomeIcon
              icon={patientData.gender === "male" ? faMars : faVenus}
              onClick={handleGenderChange}
              className="gender-icon"
            />
            <input
              className="short-input"
              type="text"
              name="last_name"
              value={patientData.last_name}
              onChange={handleInputChange}
              placeholder="Last Name"
            />
          </div>
          <div className="row">
            <input
              className="short-input"
              type="text"
              name="first_name"
              value={patientData.first_name}
              onChange={handleInputChange}
              placeholder="First Name"
            />
            <input
              className="short-input"
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
      </div>
      <button type="button" onClick={handleAddPatient}>
        Add Patient
      </button>
    </form>
  );
};
