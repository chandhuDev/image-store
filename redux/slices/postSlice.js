// redux/slices/postSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Fetch all posts
export const fetchPosts = createAsyncThunk(
  'posts/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/api/posts`);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error fetching posts');
    }
  }
);

// Create new post
export const createPost = createAsyncThunk(
  'posts/create',
  async (postData, { rejectWithValue }) => {
    try {
      const formData = new FormData();
      formData.append('imageUrl', postData.image);
      formData.append('description', postData.description);
      formData.append('categoryId', postData.categoryId);
      formData.append('userId', postData.userId);

      const { data } = await axios.post(`${API_URL}/api/posts`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error creating post');
    }
  }
);

// Like/Unlike post
// redux/slices/postSlice.js
export const likePost = createAsyncThunk(
  'posts/like',
  async ({ postId, userId }, { rejectWithValue }) => {
    try {
      // userId should be a string
      const { data } = await axios.put(`${API_URL}/api/posts/${postId}/like`, { 
        userId: userId.toString() 
      });
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error liking post');
    }
  }
);

// Add comment to post
export const addComment = createAsyncThunk(
  'posts/comment',
  async ({ postId, comment }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(`${API_URL}/api/posts/${postId}/comment`, comment);
      return { postId, comment: data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error adding comment');
    }
  }
);

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    currentPost: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearPosts: (state) => {
      state.posts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch posts
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Create post
      .addCase(createPost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.loading = false;
        state.posts.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Like post
      .addCase(likePost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(post => post._id === action.payload._id);
        if (index !== -1) {
          state.posts[index].like = action.payload.like;
        }
        if (state.currentPost?._id === action.payload._id) {
          state.currentPost.like = action.payload.like;
        }
      })
      
      // Add comment
      .addCase(addComment.fulfilled, (state, action) => {
        const index = state.posts.findIndex(post => post._id === action.payload.postId);
        if (index !== -1) {
          state.posts[index].comment.push(action.payload.comment);
        }
        if (state.currentPost?._id === action.payload.postId) {
          state.currentPost.comment.push(action.payload.comment);
        }
      });
  },
});

export const { clearError, clearPosts } = postSlice.actions;
export default postSlice.reducer;