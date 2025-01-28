'use client';

import { Provider } from "react-redux";
import { store } from "../redux/store";
import { ToastContainer } from "react-toastify";

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      {children}
      <ToastContainer 
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />      
    </Provider>
  );
}