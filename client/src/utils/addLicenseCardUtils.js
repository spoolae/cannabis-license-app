import { format } from "date-fns";
import { addLicense } from "../redux/licensesSlice";

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

export const handleSubmit = async (
  event,
  selectedPatient,
  selectedDuration,
  dispatch
) => {
  event.preventDefault();

  try {
    const currentDate = new Date();
    const formattedIssueDate = formatDate(currentDate);

    const expirationDate = new Date(currentDate);
    expirationDate.setMonth(
      expirationDate.getMonth() + parseInt(selectedDuration)
    );
    const formattedExpirationDate = formatDate(expirationDate);

    const licenseNumber = generateLicenseNumber();

    const licenseData = {
      patient_id: selectedPatient,
      issue_date: formattedIssueDate,
      expiration_date: formattedExpirationDate,
      license_number: licenseNumber,
    };

    await dispatch(addLicense(licenseData));
  } catch (error) {
    console.error("Error creating license", error);
  }
};

const formatDate = (date) => {
  return format(date, "yyyy-MM-dd");
};

const generateLicenseNumber = () => {
  const generateRandomLetter = () =>
    String.fromCharCode(65 + Math.floor(Math.random() * 26)).toUpperCase();

  const currentTimestamp = new Date().getTime();
  const uniqueCode = currentTimestamp.toString().slice(-5);

  const randomLetters = generateRandomLetter() + generateRandomLetter();
  const randomDigits = uniqueCode;

  return `${randomLetters}${randomDigits}`;
};
