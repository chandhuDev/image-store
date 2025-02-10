// redux/slices/postSlice.js
import { createSlice, createAsyncThunk, thunkAPI } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

// Fetch all posts
export const fetchAllPosts = createAsyncThunk(
  "posts/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/api/posts`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching posts"
      );
    }
  }
);

// Fetch posts by userId
export const fetchUserPosts = createAsyncThunk(
  "posts/fetchByUser",
  async (userId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/api/posts?userId=${userId}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching user posts"
      );
    }
  }
);

// Fetch single post by postId
export const fetchPostById = createAsyncThunk(
  "posts/fetchById",
  async (postId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/api/posts?postId=${postId}`);
      return data.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching post"
      );
    }
  }
);

export const createPost = createAsyncThunk(
  "posts/create",
  async (postData, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/api/posts`, {
        method: "POST",
        body: JSON.stringify({
          description: postData.description,
          categoryId: postData.categoryId,
          userId: postData.userId,
          imageUrl: postData.imageUrl,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to create post");
      }
    } catch (error) {
      return rejectWithValue(error.message || "Error creating post");
    }
  }
);

export const likePost = createAsyncThunk(
  "posts/like",
  async ({ postId, userId }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(`${API_URL}/api/posts/${postId}/like`, {
        userId,
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error liking post"
      );
    }
  }
);

export const addComment = createAsyncThunk(
  "posts/addComment",
  async ({ postId, comment }, { rejectWithValue }) => {
    try {
      const commentData = {
        text: comment.text,
        name: comment.name,
      };

      const { data } = await axios.post(
        `${API_URL}/api/posts/${postId}/comment`,
        commentData
      );

      return {
        comment: data.data,
        postId,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error adding comment"
      );
    }
  }
);

export const deletePost = createAsyncThunk(
  "posts/delete",
  async ({ postId }, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/api/posts/${postId}`);
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error deleting post"
      );
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: {
    allPosts: [],
    userPosts: [],
    currentPost: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearPosts: (state) => {
      state.allPosts = [];
      state.userPosts = [];
      state.currentPost = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all posts
      .addCase(fetchAllPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.allPosts = action.payload;
      })
      .addCase(fetchAllPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Fetch user posts
      .addCase(fetchUserPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.userPosts = action.payload;
      })
      .addCase(fetchUserPosts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch single post
      .addCase(fetchPostById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload;
      })
      .addCase(fetchPostById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        state.loading = false;

        if (state.currentPost?._id === action.payload.data._id) {
          state.currentPost.like = action.payload.data.like;
        }
      })
      .addCase(addComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;

        if (state.currentPost?._id === action.payload.postId) {
          state.currentPost.comment.push(action.payload.comment);
        }
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearPosts } = postSlice.actions;
export default postSlice.reducer;
