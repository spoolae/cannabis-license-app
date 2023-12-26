import React from "react";
import useLicenses from "../hooks/useLicenses";
import { formatLicenseDuration, getFullName } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const LicensesList = () => {
  const { licenses, removeLicense } = useLicenses();

  if (licenses.length === 0) {
    return (
      <div>
        <h2>Licenses List</h2>
        <p>No licenses available</p>
      </div>
    );
  }

  return (
    <div>
      <h2>Licenses List</h2>
      <table>
        <thead>
          <tr>
            <th>License Number</th>
            <th>Full Name</th>
            <th>License Duration</th>
            <th>Action</th> {/* Добавляем новую ячейку для кнопки */}
          </tr>
        </thead>
        <tbody>
          {licenses.map((license) => (
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
                {formatLicenseDuration(
                  license.issue_date,
                  license.expiration_date
                )}
              </td>
              <td>
                <button
                  onClick={() => removeLicense(license.license_id)}
                  aria-label="Remove License"
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LicensesList;
