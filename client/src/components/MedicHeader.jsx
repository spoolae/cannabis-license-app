import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

export const MedicHeader = () => {
  const user = useSelector((state) => state.auth.user);
  const [greetingText, setGreetingText] = useState("Unauthorised user");

  useEffect(() => {
    if (user && user?.last_name) {
      setGreetingText("Doctor " + user.last_name);
    } else if (user?.email) {
      setGreetingText(user.email);
    }
  }, [user]);

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
