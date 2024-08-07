import { configureStore } from "@reduxjs/toolkit";
import exampleSlice from "../features/example/exampleSlice";
import { chatApi } from "../features/api/apiSlice";

const store = configureStore({
  reducer: {
    example: exampleSlice,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(chatApi.middleware),
});

export default store;
