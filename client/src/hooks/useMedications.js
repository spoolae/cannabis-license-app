import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMedication, fetchMedications } from "../redux/medicationsSlice";

const useMedications = () => {
  const dispatch = useDispatch();
  const medications = useSelector((state) => state.medications.medications);
  const error = useSelector((state) => state.medications.error);

  const removeMedication = (medicationId) => {
    dispatch(deleteMedication(medicationId));
  };

  useEffect(() => {
    dispatch(fetchMedications());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      console.error("Error fetching medications:", error);
    }
  }, [error]);

  return { medications, error, removeMedication };
};

export default useMedications;
