import React, { useState } from "react";
import localFile from "../assets/images/medication.png";
import link from "../assets/images/link.png";

export const AddMedicationCard = () => {
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
      // Если файл не является изображением, отобразить оригинальную иконку
      setSelectedFile(null);
    }
  };

  const handleLinkClick = () => {
    const inputLink = window.prompt("Введите ссылку:");
    if (inputLink && isValidURL(inputLink)) {
      setSelectedFile(inputLink);
    } else {
      // Если ссылка недействительна, отобразить оригинальную иконку
      setSelectedFile(null);
    }
  };

  const isValidURL = (url) => {
    // Пример простой проверки ссылки
    const urlPattern = /^https?:\/\/.+/i;
    const dataUrlPattern = /^data:image\/.+;base64,.+/i;
    return urlPattern.test(url) || dataUrlPattern.test(url);
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
        <input type="text" placeholder="Vendor code" />
        <p>Enter the name</p>
        <input type="text" placeholder="Name" />
        <button>Add medication</button>
      </div>
    </div>
  );
};
