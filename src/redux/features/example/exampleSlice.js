import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

const exampleSlice = createSlice({
  name: "example",
  initialState,
  reducers: {
    increment: (state, action) => {
      state.value = state.value + action.payload;
    },
    decrement: (state, action) => {
      state.value = state.value - action.payload;
    },
  },
});

export const { increment, decrement } = exampleSlice.actions;

export default exampleSlice.reducer;
