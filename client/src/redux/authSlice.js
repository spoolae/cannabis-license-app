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
  },
});

export const { loginSuccess, loginFailure } = authSlice.actions;

export default authSlice.reducer;
