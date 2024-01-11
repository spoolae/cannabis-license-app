import React, { useState } from "react";
import localFile from "../assets/images/medication.png";
import link from "../assets/images/link.png";
import { useDispatch } from "react-redux";
import { addMedication } from "../redux/medicationsSlice";

export const AddMedicationCard = () => {
  const dispatch = useDispatch();

  const [vendorCode, setVendorCode] = useState("");
  const [name, setName] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFile(null);
    }
  };

  const handleLinkClick = () => {
    const inputLink = window.prompt("Enter the link:");
    if (inputLink && isValidURL(inputLink)) {
      setSelectedFile(inputLink);
    } else {
      setSelectedFile(null);
    }
  };

  const isValidURL = (url) => {
    const urlPattern = /^https?:\/\/.+/i;
    const dataUrlPattern = /^data:image\/.+;base64,.+/i;
    return urlPattern.test(url) || dataUrlPattern.test(url);
  };

  const handleAddMedication = () => {
    const defaultImageUrl = localFile; // Set the default image URL

    const medicationData = {
      name: name,
      vendor_code: vendorCode,
      image_url: selectedFile || defaultImageUrl, // Use selectedFile if available, otherwise use defaultImageUrl
    };

    dispatch(addMedication(medicationData));

    setVendorCode("");
    setName("");
    setSelectedFile(null);
  };

  return (
    <div className="add-medication-card">
      <div className="top">
        <label htmlFor="fileInput">
          <img
            className="bigIcon"
            src={selectedFile || localFile}
            alt="localFile"
          />
        </label>
        <input
          type="file"
          id="fileInput"
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
        <img
          className="smallIcon"
          src={link}
          alt="link"
          onClick={handleLinkClick}
          style={{ cursor: "pointer" }}
        />
      </div>
      <div className="bottom">
        <h3>Add new medication</h3>
        <p>Enter the vendor code</p>
        <input
          type="text"
          placeholder="Vendor code"
          value={vendorCode}
          onChange={(e) => setVendorCode(e.target.value)}
        />
        <p>Enter the name</p>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button onClick={handleAddMedication}>Add medication</button>
      </div>
    </div>
  );
};
