export const handlePatientChange = (
  event,
  patients,
  setSelectedPatient,
  setSearchTerm,
  setDropdownVisible
) => {
  const selectedPatientId = event.target.value;
  const selectedPatient = patients.find(
    (patient) => patient.patient_id === selectedPatientId
  );

  if (selectedPatient) {
    const fullName = `${selectedPatient.last_name} ${selectedPatient.first_name} ${selectedPatient.father_name}`;
    setSelectedPatient(selectedPatientId);
    setSearchTerm(fullName);
  } else {
    setSelectedPatient("");
    setSearchTerm("");
  }
  setDropdownVisible(false);
};

export const handleDurationChange = (event, setSelectedDuration) => {
  const selectedDurationValue = event.target.value;
  setSelectedDuration(selectedDurationValue);
};

export const handleSearchChange = (
  event,
  patients,
  setSearchTerm,
  setDropdownVisible
) => {
  const searchValue = event.target.value;
  setSearchTerm(searchValue);
  setDropdownVisible(!!searchValue && patients.length > 0);
};

export const handleSubmit = (event, selectedPatient, selectedDuration) => {
  event.preventDefault();
  console.log("Выбранный пациент:", selectedPatient);
  console.log("Выбранная длительность:", selectedDuration);
};
