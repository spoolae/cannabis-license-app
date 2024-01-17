import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  user: null,
  error: null,
};

export const authenticateUser = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/users/authenticate",
      {
        email,
        password,
      }
    );
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export const registerUser = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/users/create-user",
      {
        email,
        password,
      }
    );
    dispatch(loginSuccess(response.data));
  } catch (error) {
    dispatch(registerFailure(error.message));
  }
};

export const updateProfile = (profileData) => async (dispatch) => {
  try {
    const response = await axios.post(
      "http://localhost:5000/users/update-profile",
      profileData
    );
    dispatch(updateProfileSuccess(response.data));
  } catch (error) {
    dispatch(updateProfileFailure(error.message));
  }
};

export const logoutUser = () => (dispatch) => {
  dispatch(logoutSuccess());
};

export const checkAuthentication = () => (dispatch, getState) => {
  const isAuthenticated = !!getState().auth.user;
  return isAuthenticated;
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload.user;
      state.medic = action.payload.medic;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.user = null;
      state.error = action.payload;
    },
    registerSuccess: (state, action) => {
      state.user = action.payload.user;
      state.medic = action.payload.medic;
      state.error = null;
      state.registrationMessage = action.payload.message;
    },
    registerFailure: (state, action) => {
      state.user = null;
      state.medic = null;
      state.error = action.payload;
      state.registrationMessage = null;
    },
    updateProfileSuccess: (state, action) => {
      state.user = action.payload.user;
      state.medic = action.payload.medic;
      state.error = null;
    },
    updateProfileFailure: (state, action) => {
      state.error = action.payload;
    },
    logoutSuccess: (state) => {
      state.user = null;
      state.medic = null;
      state.error = null;
      state.registrationMessage = null;
    },
  },
});

export const {
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  updateProfileSuccess,
  updateProfileFailure,
  logoutSuccess,
} = authSlice.actions;

export default authSlice.reducer;
