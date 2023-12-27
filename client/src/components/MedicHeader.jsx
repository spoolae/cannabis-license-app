import React from "react";
import { Link, NavLink } from "react-router-dom";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const MedicHeader = () => {
  return (
    <div className="header">
      <h2 className="header-title">
        <Link to="/">
          Hi, <span>Doctor Johnson</span>
        </Link>
        <FontAwesomeIcon icon={faPen} className="edit-icon" />
      </h2>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Licenses</NavLink>
          </li>
          <li>
            <NavLink to="/">Patients</NavLink>
          </li>
          <li>
            <NavLink to="/">Medications</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
