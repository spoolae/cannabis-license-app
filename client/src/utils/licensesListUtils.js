import { format } from "date-fns";

export const formatLicenseDuration = (startDate, endDate) => {
  const formattedStartDate = format(new Date(startDate), "d MMMM yyyy");
  const formattedEndDate = format(new Date(endDate), "d MMMM yyyy");
  return `${formattedStartDate} - ${formattedEndDate}`;
};

export const getFullName = (lastName, firstName, fatherName) => {
  return `${lastName} ${firstName} ${fatherName}`;
};
