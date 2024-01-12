import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  patients: [],
  error: null,
};

export const fetchPatients = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://localhost:5000/patients/get-patients"
    );
    dispatch(fetchPatientsSuccess(response.data));
  } catch (error) {
    dispatch(fetchPatientsFailure(error.message));
  }
};

export const addPatient = (patientData) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/patients/add-patient",
      patientData
    );
    dispatch(addPatientSuccess(response.data));

    dispatch(fetchPatients());
  } catch (error) {
    dispatch(addPatientFailure(error.message));
  }
};

export const deletePatient = (userId) => async (dispatch) => {
  try {
    await axios.delete(
      `http://localhost:5000/patients/delete-patient/${userId}`
    );
    dispatch(deletePatientSuccess(userId));
  } catch (error) {
    dispatch(deletePatientFailure(error.message));
  }
};

export const patientsSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    fetchPatientsSuccess: (state, action) => {
      state.patients = action.payload;
      state.error = null;
    },
    fetchPatientsFailure: (state, action) => {
      state.patients = [];
      state.error = action.payload;
    },
    addPatientSuccess: (state, action) => {
      state.patients.push(action.payload);
      state.error = null;
    },
    addPatientFailure: (state, action) => {
      state.error = action.payload;
    },
    deletePatientSuccess: (state, action) => {
      state.patients = state.patients.filter(
        (patient) => patient.user_id !== action.payload
      );
      state.error = null;
    },
    deletePatientFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  fetchPatientsSuccess,
  fetchPatientsFailure,
  addPatientSuccess,
  addPatientFailure,
  deletePatientSuccess,
  deletePatientFailure,
} = patientsSlice.actions;

export default patientsSlice.reducer;
