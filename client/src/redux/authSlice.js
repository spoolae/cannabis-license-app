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

export const checkAuthentication = () => (dispatch, getState) => {
  const isAuthenticated = !!getState().auth.user;
  return isAuthenticated;
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.user = action.payload;
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
  },
});

export const { loginSuccess, loginFailure, registerSuccess, registerFailure } =
  authSlice.actions;

export default authSlice.reducer;
