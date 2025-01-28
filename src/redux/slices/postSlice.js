// redux/slices/postSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
      const { data } = await axios.get(`${API_URL}/api/posts/user/${userId}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching user posts"
      );
    }
  }
);

// Fetch posts by categoryId
export const fetchCategoryPosts = createAsyncThunk(
  "posts/fetchByCategory",
  async (categoryId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/posts/category/${categoryId}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching category posts"
      );
    }
  }
);

// Fetch single post by postId
export const fetchPostById = createAsyncThunk(
  "posts/fetchById",
  async (postId, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${API_URL}/api/posts/${postId}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching post"
      );
    }
  }
);

// Search posts
export const searchPosts = createAsyncThunk(
  "posts/search",
  async (searchTerm, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/posts/search?term=${searchTerm}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error searching posts"
      );
    }
  }
);

// Create post
export const createPost = createAsyncThunk(
  "posts/create",
  async (postData, { rejectWithValue }) => {
    try {
      const { data } = await fetch(`${API_URL}/api/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(postData)
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error creating post"
      );
    }
  }
);

// Like/Unlike post
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
      // Create comment first
      const commentData = {
        text: comment.text,
        name: comment.name,
        image: comment.image,
      };

      const { data } = await axios.post(
        `${API_URL}/api/posts/${postId}/comment`,
        commentData
      );
      return {
        postId,
        comment: data, // This will be the newly created comment
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error adding comment"
      );
    }
  }
);

export const deletePost = createAsyncThunk(
  'posts/delete',
  async (postId, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/api/posts/${postId}`);
      return postId; // Return postId to remove it from state
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Error deleting post');
    }
  }
);

const postSlice = createSlice({
  name: "posts",
  initialState: {
    allPosts: [],
    userPosts: [],
    categoryPosts: [],
    currentPost: null,
    searchResults: [],
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
      state.categoryPosts = [];
      state.searchResults = [];
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

      // Fetch category posts
      .addCase(fetchCategoryPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryPosts = action.payload;
      })
      .addCase(fetchCategoryPosts.rejected, (state, action) => {
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

      // Search posts
      .addCase(searchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchPosts.rejected, (state, action) => {
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
        state.allPosts.unshift(action.payload);
        state.userPosts.unshift(action.payload);
      })
      .addCase(createPost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Like/Unlike post
      .addCase(likePost.fulfilled, (state, action) => {
        const updatePost = (posts) => {
          const index = posts.findIndex(
            (post) => post._id === action.payload._id
          );
          if (index !== -1) {
            posts[index].like = action.payload.like;
          }
        };

        updatePost(state.allPosts);
        updatePost(state.userPosts);
        updatePost(state.categoryPosts);
        updatePost(state.searchResults);

        if (state.currentPost?._id === action.payload._id) {
          state.currentPost.like = action.payload.like;
        }
      })
      .addCase(addComment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        // Update comment in all post lists
        const updatePostComments = (posts) => {
          const post = posts.find((p) => p._id === action.payload.postId);
          if (post) {
            post.comment.push(action.payload.comment);
          }
        };

        updatePostComments(state.allPosts);
        updatePostComments(state.userPosts);
        updatePostComments(state.categoryPosts);
        updatePostComments(state.searchResults);

        // Update current post if it's the one being commented on
        if (state.currentPost?._id === action.payload.postId) {
          state.currentPost.comment.push(action.payload.comment);
        }
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(deletePost.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.loading = false;
        // Remove post from all lists
        state.allPosts = state.allPosts.filter(post => post._id !== action.payload);
        state.userPosts = state.userPosts.filter(post => post._id !== action.payload);
        state.categoryPosts = state.categoryPosts.filter(post => post._id !== action.payload);
        state.searchResults = state.searchResults.filter(post => post._id !== action.payload);
        
        // Clear currentPost if it's the deleted one
        if (state.currentPost?._id === action.payload) {
          state.currentPost = null;
        }
      })
      .addCase(deletePost.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError, clearPosts } = postSlice.actions;
export default postSlice.reducer;
