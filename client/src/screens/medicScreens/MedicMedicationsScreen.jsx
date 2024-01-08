import React, { useState, useEffect } from "react";
import { MedicHeader } from "../../components/MedicHeader";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMedications,
  addMedication,
  deleteMedication,
} from "../../redux/medicationsSlice";

export const MedicMedicationsScreen = () => {
  const dispatch = useDispatch();
  const medications = useSelector((state) => state.medications.medications);
  const error = useSelector((state) => state.medications.error);

  const [newMedication, setNewMedication] = useState({
    name: "",
    image_url: "",
    vendor_code: "",
  });

  useEffect(() => {
    dispatch(fetchMedications());
  }, [dispatch]);

  const handleAddMedication = () => {
    dispatch(addMedication(newMedication));

    // Очистка формы после добавления
    setNewMedication({
      name: "",
      image_url: "",
      vendor_code: "",
    });
  };

  const handleRemoveMedication = (medicationId) => {
    dispatch(deleteMedication(medicationId));
  };

  return (
    <div className="home-screen">
      <MedicHeader />
      <div className="home-screen-content">
        <h2>Medications</h2>

        {/* Вывод списка препаратов */}
        <ul>
          {medications.map((medication) => (
            <li key={medication.medication_id}>
              {medication.name} - {medication.vendor_code}
              <button
                onClick={() => handleRemoveMedication(medication.medication_id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>

        {/* Форма для добавления нового препарата */}
        <h3>Add New Medication</h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleAddMedication();
          }}
        >
          <label>
            Name:
            <input
              type="text"
              value={newMedication.name}
              onChange={(e) =>
                setNewMedication({ ...newMedication, name: e.target.value })
              }
            />
          </label>
          <label>
            Image URL:
            <input
              type="text"
              value={newMedication.image_url}
              onChange={(e) =>
                setNewMedication({
                  ...newMedication,
                  image_url: e.target.value,
                })
              }
            />
          </label>
          <label>
            Vendor Code:
            <input
              type="text"
              value={newMedication.vendor_code}
              onChange={(e) =>
                setNewMedication({
                  ...newMedication,
                  vendor_code: e.target.value,
                })
              }
            />
          </label>
          <button type="submit">Add Medication</button>
        </form>

        {/* Обработка ошибок, если есть */}
        {error && <p>Error: {error}</p>}
      </div>
    </div>
  );
};
