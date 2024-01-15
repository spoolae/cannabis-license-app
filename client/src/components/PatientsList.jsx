import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPatients, deletePatient } from "../redux/patientsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
import defaultAvatar from "../assets/images/avatar.png";

export const PatientsList = () => {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.patients.patients);

  useEffect(() => {
    dispatch(fetchPatients());
  }, [dispatch]);

  const handleRemovePatient = (userId) => {
    dispatch(deletePatient(userId));
  };

  return (
    <div className="patients-list">
      <h3 className="title">Patients List</h3>
      <div className="list-content">
        <ul>
          {patients.map((patient) => (
            <li key={patient.user_id}>
              <div className="group-left">
                <div>
                  <img
                    src={patient.avatar || defaultAvatar}
                    alt={`${patient.first_name} ${patient.last_name}`}
                  />
                </div>
                <div>
                  <p>
                    {patient.gender === "male" ? (
                      <FontAwesomeIcon icon={faMars} />
                    ) : (
                      <FontAwesomeIcon icon={faVenus} />
                    )}{" "}
                    {patient.last_name}
                  </p>
                  <p>{`${patient.first_name} ${patient.father_name}`}</p>
                </div>
                <div>
                  <h5>
                    {patient.license_number
                      ? patient.license_number
                      : "Invalid License"}
                  </h5>
                  <p>
                    {patient.health_description
                      ? patient.health_description
                      : "There's no health info"}
                  </p>
                </div>

                <div>
                  <p>
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      style={{ marginRight: "5px" }}
                    />
                    Contact:
                  </p>
                  <p>{patient.email}</p>
                </div>
              </div>
              <button onClick={() => handleRemovePatient(patient.user_id)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
