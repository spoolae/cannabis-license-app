import { useState, useEffect, useRef } from "react";

const usePatients = (searchTerm) => {
  const [patients, setPatients] = useState([]);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/patients/search?searchTerm=${searchTerm}`
        );
        const data = await response.json();
        setPatients(data);
        setDropdownVisible(!!searchTerm && data.length > 0);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, [searchTerm]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return { patients, isDropdownVisible, dropdownRef };
};

export default usePatients;
