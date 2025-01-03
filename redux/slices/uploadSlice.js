// redux/slices/uploadSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const uploadFile = createAsyncThunk(
  'upload/file',
  async (formData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/api/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Upload failed');
    }
  }
);

const uploadSlice = createSlice({
  name: 'upload',
  initialState: {
    loading: false,
    error: null,
  },
  reducers: {
    clearUploadError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadFile.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUploadError } = uploadSlice.actions;
export default uploadSlice.reducer;