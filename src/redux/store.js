"use client"
import { configureStore } from "@reduxjs/toolkit";
import logger from 'redux-logger';
import userReducer from "./slices/userSlice";
import postReducer from "./slices/postSlice";
import uploadReducer from "./slices/uploadSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    posts: postReducer,
    upload: uploadReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({});
    if (process.env.NODE_ENV === 'development') middleware.push(logger);
    return middleware;
  },
});

export default store;
