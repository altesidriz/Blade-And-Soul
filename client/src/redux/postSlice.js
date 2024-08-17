import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPost: null,
  loading: false,
  error: false,
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true;
    },
    fetchSuccess: (state, action) => {
      state.loading = false;
      state.currentPost = action.payload;
    },
    fetchFailure: (state) => {
      state.loading = false;
      state.error = true;
    },
    like: (state, action) => {
      if (!state.currentPost.likes.includes(action.payload)) {
        state.currentPost.likes.push(action.payload);
      }else{
        return;
      }
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure, like } =
  postSlice.actions;

export default postSlice.reducer;