import React from "react";
import { Link, NavLink } from "react-router-dom";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

export const MedicHeader = () => {
  const user = useSelector((state) => state.auth.user);

  console.log("User:", user);

  const greetingText = user?.user.last_name
    ? `Doctor ${user.user.last_name}`
    : user?.user.email || "You're welcome";

  return (
    <div className="header">
      <h2 className="header-title">
        <Link to="/medic/profile">
          Hi, <span>{greetingText}</span>
        </Link>
        <FontAwesomeIcon icon={faPen} className="edit-icon" />
      </h2>
      <nav>
        <ul>
          <li>
            <NavLink to="/medic/licenses">Licenses</NavLink>
          </li>
          <li>
            <NavLink to="/medic/patients">Patients</NavLink>
          </li>
          <li>
            <NavLink to="/medic/medications">Medications</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
