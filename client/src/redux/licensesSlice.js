import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  licenses: [],
  error: null,
};

export const fetchLicenses = () => async (dispatch) => {
  try {
    const response = await axios.get(
      "http://localhost:5000/licenses/get-licenses"
    );
    dispatch(fetchLicensesSuccess(response.data));
  } catch (error) {
    dispatch(fetchLicensesFailure(error.message));
  }
};

export const addLicense = (licenseData) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/licenses/add-license",
      licenseData
    );
    dispatch(addLicenseSuccess(response.data));
  } catch (error) {
    dispatch(addLicenseFailure(error.message));
  }
};

export const deleteLicense = (licenseId) => async (dispatch) => {
  try {
    await axios.delete(
      `http://localhost:5000/licenses/delete-license/${licenseId}`
    );
    dispatch(deleteLicenseSuccess(licenseId));
  } catch (error) {
    dispatch(deleteLicenseFailure(error.message));
  }
};

export const licensesSlice = createSlice({
  name: "licenses",
  initialState,
  reducers: {
    fetchLicensesSuccess: (state, action) => {
      state.licenses = action.payload;
      state.error = null;
    },
    fetchLicensesFailure: (state, action) => {
      state.licenses = [];
      state.error = action.payload;
    },
    addLicenseSuccess: (state, action) => {
      state.licenses.push(action.payload);
      state.error = null;
    },
    addLicenseFailure: (state, action) => {
      state.error = action.payload;
    },
    deleteLicenseSuccess: (state, action) => {
      state.licenses = state.licenses.filter(
        (license) => license.license_id !== action.payload
      );
      state.error = null;
    },
    deleteLicenseFailure: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  fetchLicensesSuccess,
  fetchLicensesFailure,
  addLicenseSuccess,
  addLicenseFailure,
  deleteLicenseSuccess,
  deleteLicenseFailure,
} = licensesSlice.actions;

export default licensesSlice.reducer;
