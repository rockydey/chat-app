import { configureStore } from "@reduxjs/toolkit";
import exampleSlice from "../features/example/exampleSlice";

const store = configureStore({
  reducer: {
    example: exampleSlice,
  },
});

export default store;
