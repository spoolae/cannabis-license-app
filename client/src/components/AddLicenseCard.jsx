import React, { useState } from "react";
import { SelectPatient } from "./SelectPatient";
import { SelectLicenseTerm } from "./SelectLicenseTerm";
import { handleSubmit } from "../utils";
import usePatients from "../hooks/usePatients";
import weedBud from "../assets/images/weedBud.png";
import avatar from "../assets/images/avatar.png";
import calendar from "../assets/images/calendar.png";
import plus from "../assets/images/plus.png";
import { useDispatch } from "react-redux";

export const AddLicenseCard = () => {
  const [selectedPatient, setSelectedPatient] = useState("");
  const [selectedDuration, setSelectedDuration] = useState("3");
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const { patients } = usePatients(searchTerm);
  const dispatch = useDispatch();

  const LeftSideContent = (
    <>
      <div />
      <div />
      <div />
      <div />
      <div />
    </>
  );

  return (
    <div className="add-license-card">
      <img src={weedBud} alt="Weed bud" />
      <form className="content">
        <div className="leftSide">{LeftSideContent}</div>
        <div className="rightSide">
          <h3>Create a new license</h3>
          <div>
            <img src={avatar} alt="Avatar" />
            <p>Select a patient to create a license</p>
            <SelectPatient
              searchTerm={searchTerm}
              patients={patients}
              isDropdownVisible={isDropdownVisible}
              setSearchTerm={setSearchTerm}
              setDropdownVisible={setDropdownVisible}
              setSelectedPatient={setSelectedPatient}
            />
          </div>
          <div>
            <img src={calendar} alt="Calendar" />
            <p>Select duration of license</p>
            <SelectLicenseTerm
              selectedDuration={selectedDuration}
              setSelectedDuration={setSelectedDuration}
            />
          </div>
          <div>
            <img
              id="plus"
              onClick={(event) =>
                handleSubmit(event, selectedPatient, selectedDuration, dispatch)
              }
              src={plus}
              alt="Plus"
            />
          </div>
        </div>
      </form>
    </div>
  );
};
