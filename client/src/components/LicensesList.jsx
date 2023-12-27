import React from "react";
import useLicenses from "../hooks/useLicenses";
import { formatLicenseDuration, getFullName } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const LicenseRow = ({ license, onRemove }) => {
  return (
    <tr key={license.license_id}>
      <td>{license.license_number}</td>
      <td>
        {getFullName(
          license.last_name,
          license.first_name,
          license.father_name
        )}
      </td>
      <td>
        {formatLicenseDuration(license.issue_date, license.expiration_date)}
      </td>
      <td>
        <button
          onClick={() => onRemove(license.license_id)}
          aria-label="Remove License"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </td>
    </tr>
  );
};

const LicensesTable = ({ licenses, onRemove }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>License Number</th>
          <th>Full Name</th>
          <th>License Duration</th>
        </tr>
      </thead>
      <tbody>
        {licenses
          .filter((license) => license.license_id)
          .map((license) => (
            <LicenseRow
              key={license.license_id}
              license={license}
              onRemove={onRemove}
            />
          ))}
      </tbody>
    </table>
  );
};

export const LicensesList = () => {
  const { licenses, removeLicense } = useLicenses();

  const renderContent = () => {
    if (licenses.length === 0) {
      return <p>No licenses available</p>;
    } else {
      return <LicensesTable licenses={licenses} onRemove={removeLicense} />;
    }
  };

  return (
    <div>
      <h2>Licenses List</h2>
      {renderContent()}
    </div>
  );
};

export default LicensesList;
