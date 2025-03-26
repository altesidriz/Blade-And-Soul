import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  loading: false,
  error: false,
  message: '',
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = {
        ...action.payload,
        wallet: action.payload.wallet || 0
      };
    },
    loginFailure: (state) => {
      state.loading = false;
      state.error = true;
      state.message = 'Wrong username or password!';
    },
    logout: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = false;
    },
    updateUserWallet: (state, action) => {
      if (state.currentUser) {
        state.currentUser.wallet -= action.payload;
      }
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout, updateUserWallet} = userSlice.actions;

export default userSlice.reducer;