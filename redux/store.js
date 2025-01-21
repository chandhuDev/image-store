import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import postReducer from "./slices/postSlice";
import uploadReducer from "./slices/uploadSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
    upload: uploadReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
