import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice";
import postReducer from "./slices/postSlice";
import uploadReducer from "./slices/uploadSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    posts: postReducer,
    upload: uploadReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
