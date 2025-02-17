"use client";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/slices/userSlice";

export default function Providers({ children }) {
  return (
    <Provider store={store}>
      <InitUser>
        {children}
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          closeOnClick
          pauseOnHover
        />
      </InitUser>
    </Provider>
  );
}

const InitUser = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUser = localStorage.getItem("imageUser");
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        dispatch(setUser(user));
      } catch (error) {
        console.error("Error parsing stored user:", error);
      }
    }
  }, [dispatch]);

  return children;
};
