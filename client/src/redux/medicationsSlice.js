import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  medications: [],
  error: null,
};

export const fetchMedications = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://localhost:5000/medications/get-medications"
    );
    dispatch(fetchMedicationsSuccess(response.data));
  } catch (error) {
    dispatch(fetchMedicationsFailure(error.message));
  }
};

export const addMedication = (medicationData) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/medications/add-medication",
      medicationData
    );
    dispatch(addMedicationSuccess(response.data));

    dispatch(fetchMedications());
  } catch (error) {
    dispatch(addMedicationFailure(error.message));
  }
};

export const deleteMedication = (medicationId) => async (dispatch) => {
  try {
    await axios.delete(
      `http://localhost:5000/medications/delete-medication/${medicationId}`
    );
    dispatch(deleteMedicationSuccess(medicationId));
  } catch (error) {
    dispatch(deleteMedicationFailure(error.message));
  }
};

export const medicationsSlice = createSlice({
  name: "medications",
  initialState,
  reducers: {
    fetchMedicationsSuccess: (state, action) => {
      state.medications = action.payload;
      state.error = null;
    },
    fetchMedicationsFailure: (state, action) => {
      state.medications = [];
      state.error = action.payload;
    },
    addMedicationSuccess: (state, action) => {
      state.medications.push(action.payload);
      state.error = null;
    },
    addMedicationFailure: (state, action) => {
      state.error = action.payload;
    },
    deleteMedicationSuccess: (state, action) => {
      state.medications = state.medications.filter(
        (medication) => medication.medication_id !== action.payload
      );
      state.error = null;
    },
    deleteMedicationFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  fetchMedicationsSuccess,
  fetchMedicationsFailure,
  addMedicationSuccess,
  addMedicationFailure,
  deleteMedicationSuccess,
  deleteMedicationFailure,
} = medicationsSlice.actions;

export default medicationsSlice.reducer;
