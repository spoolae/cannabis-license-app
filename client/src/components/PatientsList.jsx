import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPatients, deletePatient } from "../redux/patientsSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMars, faVenus } from "@fortawesome/free-solid-svg-icons";
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
    <div className="medications-list">
      <h3 className="title">Medications List</h3>
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
                  <p>{patient.health_description}</p>
                </div>
                <div>
                  <h5>{patient.license_number}</h5>
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
