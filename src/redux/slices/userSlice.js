import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const loadInitialState = () => {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("imageUser");
    try {
      return {
        currentUser: storedUser ? JSON.parse(storedUser) : null,
        loading: false,
        error: null,
      };
    } catch (error) {
      console.error("Error parsing stored user:", error);
      return {
        currentUser: null,
        loading: false,
        error: null,
      };
    }
  }
  return {
    currentUser: null,
    loading: false,
    error: null,
  };
};

export const userLogin = createAsyncThunk(
  "user/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        `${API_URL}/api/auth/login`,
        credentials
      );

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      localStorage.setItem("imageToken", data.token);
      localStorage.setItem("imageUser", JSON.stringify(data.user));
      document.cookie = `imageToken=${data.token}; path=/`;

      return data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  }
);

export const userSignup = createAsyncThunk(
  "user/signup",
  async (userData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/api/auth/signup`, userData);

      if (!data.success) {
        return rejectWithValue(data.message);
      }

      localStorage.setItem("imageToken", data.token);
      localStorage.setItem("imageUser", JSON.stringify(data.user));
      document.cookie = `imageToken=${data.token}; path=/`;

      return data.user;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: loadInitialState(),
  reducers: {
    logout: (state) => {
      state.currentUser = null;
      localStorage.removeItem("imageToken");
      localStorage.removeItem("imageUser");
      document.cookie =
        "imageToken=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    },
    setUser: (state, action) => {
      state.currentUser = action.payload;
      localStorage.setItem("imageUser", JSON.stringify(action.payload));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(userSignup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userSignup.fulfilled, (state, action) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(userSignup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setUser } = userSlice.actions;
export default userSlice.reducer;
