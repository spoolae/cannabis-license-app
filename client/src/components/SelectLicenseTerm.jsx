import React from "react";
import { handleDurationChange } from "../utils";

export const SelectLicenseTerm = ({
  selectedDuration,
  setSelectedDuration,
}) => {
  return (
    <>
      <select
        value={selectedDuration}
        onChange={(event) => handleDurationChange(event, setSelectedDuration)}
      >
        <option value="3">3 Months</option>
        <option value="6">6 Months</option>
        <option value="12">12 Months</option>
      </select>
    </>
  );
};
