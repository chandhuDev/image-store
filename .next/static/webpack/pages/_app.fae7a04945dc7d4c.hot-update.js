"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/_app",{

/***/ "./redux/slices/postSlice.js":
/*!***********************************!*\
  !*** ./redux/slices/postSlice.js ***!
  \***********************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   addComment: function() { return /* binding */ addComment; },\n/* harmony export */   clearError: function() { return /* binding */ clearError; },\n/* harmony export */   clearPosts: function() { return /* binding */ clearPosts; },\n/* harmony export */   createPost: function() { return /* binding */ createPost; },\n/* harmony export */   fetchPosts: function() { return /* binding */ fetchPosts; },\n/* harmony export */   likePost: function() { return /* binding */ likePost; }\n/* harmony export */ });\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ \"./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js\");\n/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n// redux/slices/postSlice.js\n\n\nconst API_URL = \"http://localhost:3000\";\n// Fetch all posts\nconst fetchPosts = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAsyncThunk)(\"posts/fetchAll\", async (_, param)=>{\n    let { rejectWithValue } = param;\n    try {\n        const { data } = await axios__WEBPACK_IMPORTED_MODULE_1__[\"default\"].get(\"\".concat(API_URL, \"/api/posts\"));\n        return data;\n    } catch (error) {\n        var _error_response_data, _error_response;\n        return rejectWithValue(((_error_response = error.response) === null || _error_response === void 0 ? void 0 : (_error_response_data = _error_response.data) === null || _error_response_data === void 0 ? void 0 : _error_response_data.message) || \"Error fetching posts\");\n    }\n});\n// Create new post\nconst createPost = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAsyncThunk)(\"posts/create\", async (postData, param)=>{\n    let { rejectWithValue } = param;\n    try {\n        const formData = new FormData();\n        formData.append(\"imageUrl\", postData.image);\n        formData.append(\"description\", postData.description);\n        formData.append(\"categoryId\", postData.categoryId);\n        formData.append(\"userId\", postData.userId);\n        const { data } = await axios__WEBPACK_IMPORTED_MODULE_1__[\"default\"].post(\"\".concat(API_URL, \"/api/posts\"), formData, {\n            headers: {\n                \"Content-Type\": \"multipart/form-data\"\n            }\n        });\n        return data;\n    } catch (error) {\n        var _error_response_data, _error_response;\n        return rejectWithValue(((_error_response = error.response) === null || _error_response === void 0 ? void 0 : (_error_response_data = _error_response.data) === null || _error_response_data === void 0 ? void 0 : _error_response_data.message) || \"Error creating post\");\n    }\n});\n// Like/Unlike post\nconst likePost = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAsyncThunk)(\"posts/like\", async (param, param1)=>{\n    let { postId, userId } = param, { rejectWithValue } = param1;\n    try {\n        const { data } = await axios__WEBPACK_IMPORTED_MODULE_1__[\"default\"].put(\"\".concat(API_URL, \"/api/posts/\").concat(postId, \"/like\"), {\n            userId\n        });\n        return data;\n    } catch (error) {\n        var _error_response_data, _error_response;\n        return rejectWithValue(((_error_response = error.response) === null || _error_response === void 0 ? void 0 : (_error_response_data = _error_response.data) === null || _error_response_data === void 0 ? void 0 : _error_response_data.message) || \"Error liking post\");\n    }\n});\n// Add comment to post\nconst addComment = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createAsyncThunk)(\"posts/comment\", async (param, param1)=>{\n    let { postId, comment } = param, { rejectWithValue } = param1;\n    try {\n        const { data } = await axios__WEBPACK_IMPORTED_MODULE_1__[\"default\"].post(\"\".concat(API_URL, \"/api/posts/\").concat(postId, \"/comment\"), comment);\n        return {\n            postId,\n            comment: data\n        };\n    } catch (error) {\n        var _error_response_data, _error_response;\n        return rejectWithValue(((_error_response = error.response) === null || _error_response === void 0 ? void 0 : (_error_response_data = _error_response.data) === null || _error_response_data === void 0 ? void 0 : _error_response_data.message) || \"Error adding comment\");\n    }\n});\nconst postSlice = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__.createSlice)({\n    name: \"posts\",\n    initialState: {\n        posts: [],\n        currentPost: null,\n        loading: false,\n        error: null\n    },\n    reducers: {\n        clearError: (state)=>{\n            state.error = null;\n        },\n        clearPosts: (state)=>{\n            state.posts = [];\n        }\n    },\n    extraReducers: (builder)=>{\n        builder// Fetch posts\n        .addCase(fetchPosts.pending, (state)=>{\n            state.loading = true;\n            state.error = null;\n        }).addCase(fetchPosts.fulfilled, (state, action)=>{\n            state.loading = false;\n            state.posts = action.payload;\n        }).addCase(fetchPosts.rejected, (state, action)=>{\n            state.loading = false;\n            state.error = action.payload;\n        })// Create post\n        .addCase(createPost.pending, (state)=>{\n            state.loading = true;\n            state.error = null;\n        }).addCase(createPost.fulfilled, (state, action)=>{\n            state.loading = false;\n            state.posts.unshift(action.payload);\n        }).addCase(createPost.rejected, (state, action)=>{\n            state.loading = false;\n            state.error = action.payload;\n        })// Like post\n        .addCase(likePost.fulfilled, (state, action)=>{\n            var _state_currentPost;\n            const index = state.posts.findIndex((post)=>post._id === action.payload._id);\n            if (index !== -1) {\n                state.posts[index].like = action.payload.like;\n            }\n            if (((_state_currentPost = state.currentPost) === null || _state_currentPost === void 0 ? void 0 : _state_currentPost._id) === action.payload._id) {\n                state.currentPost.like = action.payload.like;\n            }\n        })// Add comment\n        .addCase(addComment.fulfilled, (state, action)=>{\n            var _state_currentPost;\n            const index = state.posts.findIndex((post)=>post._id === action.payload.postId);\n            if (index !== -1) {\n                state.posts[index].comment.push(action.payload.comment);\n            }\n            if (((_state_currentPost = state.currentPost) === null || _state_currentPost === void 0 ? void 0 : _state_currentPost._id) === action.payload.postId) {\n                state.currentPost.comment.push(action.payload.comment);\n            }\n        });\n    }\n});\nconst { clearError, clearPosts } = postSlice.actions;\n/* harmony default export */ __webpack_exports__[\"default\"] = (postSlice.reducer);\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0Y7QUFFTyxNQUFNLEVBQUVRLFVBQVUsRUFBRUUsVUFBVSxFQUFFLEdBQUdULFVBQVV3QixPQUFPLENBQUM7QUFDNUQsK0RBQWV4QixVQUFVeUIsT0FBTyxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3JlZHV4L3NsaWNlcy9wb3N0U2xpY2UuanM/OTEzNyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyByZWR1eC9zbGljZXMvcG9zdFNsaWNlLmpzXHJcbmltcG9ydCB7IGNyZWF0ZVNsaWNlLCBjcmVhdGVBc3luY1RodW5rIH0gZnJvbSAnQHJlZHV4anMvdG9vbGtpdCc7XHJcbmltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XHJcblxyXG5jb25zdCBBUElfVVJMID0gcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfQVBJX1VSTDtcclxuXHJcbi8vIEZldGNoIGFsbCBwb3N0c1xyXG5leHBvcnQgY29uc3QgZmV0Y2hQb3N0cyA9IGNyZWF0ZUFzeW5jVGh1bmsoXHJcbiAgJ3Bvc3RzL2ZldGNoQWxsJyxcclxuICBhc3luYyAoXywgeyByZWplY3RXaXRoVmFsdWUgfSkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBheGlvcy5nZXQoYCR7QVBJX1VSTH0vYXBpL3Bvc3RzYCk7XHJcbiAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgcmV0dXJuIHJlamVjdFdpdGhWYWx1ZShlcnJvci5yZXNwb25zZT8uZGF0YT8ubWVzc2FnZSB8fCAnRXJyb3IgZmV0Y2hpbmcgcG9zdHMnKTtcclxuICAgIH1cclxuICB9XHJcbik7XHJcblxyXG4vLyBDcmVhdGUgbmV3IHBvc3RcclxuZXhwb3J0IGNvbnN0IGNyZWF0ZVBvc3QgPSBjcmVhdGVBc3luY1RodW5rKFxyXG4gICdwb3N0cy9jcmVhdGUnLFxyXG4gIGFzeW5jIChwb3N0RGF0YSwgeyByZWplY3RXaXRoVmFsdWUgfSkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgICAgZm9ybURhdGEuYXBwZW5kKCdpbWFnZVVybCcsIHBvc3REYXRhLmltYWdlKTtcclxuICAgICAgZm9ybURhdGEuYXBwZW5kKCdkZXNjcmlwdGlvbicsIHBvc3REYXRhLmRlc2NyaXB0aW9uKTtcclxuICAgICAgZm9ybURhdGEuYXBwZW5kKCdjYXRlZ29yeUlkJywgcG9zdERhdGEuY2F0ZWdvcnlJZCk7XHJcbiAgICAgIGZvcm1EYXRhLmFwcGVuZCgndXNlcklkJywgcG9zdERhdGEudXNlcklkKTtcclxuXHJcbiAgICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgYXhpb3MucG9zdChgJHtBUElfVVJMfS9hcGkvcG9zdHNgLCBmb3JtRGF0YSwge1xyXG4gICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnbXVsdGlwYXJ0L2Zvcm0tZGF0YScsXHJcbiAgICAgICAgfSxcclxuICAgICAgfSk7XHJcbiAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgcmV0dXJuIHJlamVjdFdpdGhWYWx1ZShlcnJvci5yZXNwb25zZT8uZGF0YT8ubWVzc2FnZSB8fCAnRXJyb3IgY3JlYXRpbmcgcG9zdCcpO1xyXG4gICAgfVxyXG4gIH1cclxuKTtcclxuXHJcbi8vIExpa2UvVW5saWtlIHBvc3RcclxuZXhwb3J0IGNvbnN0IGxpa2VQb3N0ID0gY3JlYXRlQXN5bmNUaHVuayhcclxuICAncG9zdHMvbGlrZScsXHJcbiAgYXN5bmMgKHsgcG9zdElkLCB1c2VySWQgfSwgeyByZWplY3RXaXRoVmFsdWUgfSkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgY29uc3QgeyBkYXRhIH0gPSBhd2FpdCBheGlvcy5wdXQoYCR7QVBJX1VSTH0vYXBpL3Bvc3RzLyR7cG9zdElkfS9saWtlYCwgeyB1c2VySWQgfSk7XHJcbiAgICAgIHJldHVybiBkYXRhO1xyXG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcclxuICAgICAgcmV0dXJuIHJlamVjdFdpdGhWYWx1ZShlcnJvci5yZXNwb25zZT8uZGF0YT8ubWVzc2FnZSB8fCAnRXJyb3IgbGlraW5nIHBvc3QnKTtcclxuICAgIH1cclxuICB9XHJcbik7XHJcblxyXG4vLyBBZGQgY29tbWVudCB0byBwb3N0XHJcbmV4cG9ydCBjb25zdCBhZGRDb21tZW50ID0gY3JlYXRlQXN5bmNUaHVuayhcclxuICAncG9zdHMvY29tbWVudCcsXHJcbiAgYXN5bmMgKHsgcG9zdElkLCBjb21tZW50IH0sIHsgcmVqZWN0V2l0aFZhbHVlIH0pID0+IHtcclxuICAgIHRyeSB7XHJcbiAgICAgIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgYXhpb3MucG9zdChgJHtBUElfVVJMfS9hcGkvcG9zdHMvJHtwb3N0SWR9L2NvbW1lbnRgLCBjb21tZW50KTtcclxuICAgICAgcmV0dXJuIHsgcG9zdElkLCBjb21tZW50OiBkYXRhIH07XHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICByZXR1cm4gcmVqZWN0V2l0aFZhbHVlKGVycm9yLnJlc3BvbnNlPy5kYXRhPy5tZXNzYWdlIHx8ICdFcnJvciBhZGRpbmcgY29tbWVudCcpO1xyXG4gICAgfVxyXG4gIH1cclxuKTtcclxuXHJcbmNvbnN0IHBvc3RTbGljZSA9IGNyZWF0ZVNsaWNlKHtcclxuICBuYW1lOiAncG9zdHMnLFxyXG4gIGluaXRpYWxTdGF0ZToge1xyXG4gICAgcG9zdHM6IFtdLFxyXG4gICAgY3VycmVudFBvc3Q6IG51bGwsXHJcbiAgICBsb2FkaW5nOiBmYWxzZSxcclxuICAgIGVycm9yOiBudWxsLFxyXG4gIH0sXHJcbiAgcmVkdWNlcnM6IHtcclxuICAgIGNsZWFyRXJyb3I6IChzdGF0ZSkgPT4ge1xyXG4gICAgICBzdGF0ZS5lcnJvciA9IG51bGw7XHJcbiAgICB9LFxyXG4gICAgY2xlYXJQb3N0czogKHN0YXRlKSA9PiB7XHJcbiAgICAgIHN0YXRlLnBvc3RzID0gW107XHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgZXh0cmFSZWR1Y2VyczogKGJ1aWxkZXIpID0+IHtcclxuICAgIGJ1aWxkZXJcclxuICAgICAgLy8gRmV0Y2ggcG9zdHNcclxuICAgICAgLmFkZENhc2UoZmV0Y2hQb3N0cy5wZW5kaW5nLCAoc3RhdGUpID0+IHtcclxuICAgICAgICBzdGF0ZS5sb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgICBzdGF0ZS5lcnJvciA9IG51bGw7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5hZGRDYXNlKGZldGNoUG9zdHMuZnVsZmlsbGVkLCAoc3RhdGUsIGFjdGlvbikgPT4ge1xyXG4gICAgICAgIHN0YXRlLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICBzdGF0ZS5wb3N0cyA9IGFjdGlvbi5wYXlsb2FkO1xyXG4gICAgICB9KVxyXG4gICAgICAuYWRkQ2FzZShmZXRjaFBvc3RzLnJlamVjdGVkLCAoc3RhdGUsIGFjdGlvbikgPT4ge1xyXG4gICAgICAgIHN0YXRlLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICBzdGF0ZS5lcnJvciA9IGFjdGlvbi5wYXlsb2FkO1xyXG4gICAgICB9KVxyXG4gICAgICBcclxuICAgICAgLy8gQ3JlYXRlIHBvc3RcclxuICAgICAgLmFkZENhc2UoY3JlYXRlUG9zdC5wZW5kaW5nLCAoc3RhdGUpID0+IHtcclxuICAgICAgICBzdGF0ZS5sb2FkaW5nID0gdHJ1ZTtcclxuICAgICAgICBzdGF0ZS5lcnJvciA9IG51bGw7XHJcbiAgICAgIH0pXHJcbiAgICAgIC5hZGRDYXNlKGNyZWF0ZVBvc3QuZnVsZmlsbGVkLCAoc3RhdGUsIGFjdGlvbikgPT4ge1xyXG4gICAgICAgIHN0YXRlLmxvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICBzdGF0ZS5wb3N0cy51bnNoaWZ0KGFjdGlvbi5wYXlsb2FkKTtcclxuICAgICAgfSlcclxuICAgICAgLmFkZENhc2UoY3JlYXRlUG9zdC5yZWplY3RlZCwgKHN0YXRlLCBhY3Rpb24pID0+IHtcclxuICAgICAgICBzdGF0ZS5sb2FkaW5nID0gZmFsc2U7XHJcbiAgICAgICAgc3RhdGUuZXJyb3IgPSBhY3Rpb24ucGF5bG9hZDtcclxuICAgICAgfSlcclxuICAgICAgXHJcbiAgICAgIC8vIExpa2UgcG9zdFxyXG4gICAgICAuYWRkQ2FzZShsaWtlUG9zdC5mdWxmaWxsZWQsIChzdGF0ZSwgYWN0aW9uKSA9PiB7XHJcbiAgICAgICAgY29uc3QgaW5kZXggPSBzdGF0ZS5wb3N0cy5maW5kSW5kZXgocG9zdCA9PiBwb3N0Ll9pZCA9PT0gYWN0aW9uLnBheWxvYWQuX2lkKTtcclxuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XHJcbiAgICAgICAgICBzdGF0ZS5wb3N0c1tpbmRleF0ubGlrZSA9IGFjdGlvbi5wYXlsb2FkLmxpa2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChzdGF0ZS5jdXJyZW50UG9zdD8uX2lkID09PSBhY3Rpb24ucGF5bG9hZC5faWQpIHtcclxuICAgICAgICAgIHN0YXRlLmN1cnJlbnRQb3N0Lmxpa2UgPSBhY3Rpb24ucGF5bG9hZC5saWtlO1xyXG4gICAgICAgIH1cclxuICAgICAgfSlcclxuICAgICAgXHJcbiAgICAgIC8vIEFkZCBjb21tZW50XHJcbiAgICAgIC5hZGRDYXNlKGFkZENvbW1lbnQuZnVsZmlsbGVkLCAoc3RhdGUsIGFjdGlvbikgPT4ge1xyXG4gICAgICAgIGNvbnN0IGluZGV4ID0gc3RhdGUucG9zdHMuZmluZEluZGV4KHBvc3QgPT4gcG9zdC5faWQgPT09IGFjdGlvbi5wYXlsb2FkLnBvc3RJZCk7XHJcbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xyXG4gICAgICAgICAgc3RhdGUucG9zdHNbaW5kZXhdLmNvbW1lbnQucHVzaChhY3Rpb24ucGF5bG9hZC5jb21tZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHN0YXRlLmN1cnJlbnRQb3N0Py5faWQgPT09IGFjdGlvbi5wYXlsb2FkLnBvc3RJZCkge1xyXG4gICAgICAgICAgc3RhdGUuY3VycmVudFBvc3QuY29tbWVudC5wdXNoKGFjdGlvbi5wYXlsb2FkLmNvbW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgfSxcclxufSk7XHJcblxyXG5leHBvcnQgY29uc3QgeyBjbGVhckVycm9yLCBjbGVhclBvc3RzIH0gPSBwb3N0U2xpY2UuYWN0aW9ucztcclxuZXhwb3J0IGRlZmF1bHQgcG9zdFNsaWNlLnJlZHVjZXI7Il0sIm5hbWVzIjpbImNyZWF0ZVNsaWNlIiwiY3JlYXRlQXN5bmNUaHVuayIsImF4aW9zIiwiQVBJX1VSTCIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19BUElfVVJMIiwiZmV0Y2hQb3N0cyIsIl8iLCJyZWplY3RXaXRoVmFsdWUiLCJkYXRhIiwiZ2V0IiwiZXJyb3IiLCJyZXNwb25zZSIsIm1lc3NhZ2UiLCJjcmVhdGVQb3N0IiwicG9zdERhdGEiLCJmb3JtRGF0YSIsIkZvcm1EYXRhIiwiYXBwZW5kIiwiaW1hZ2UiLCJkZXNjcmlwdGlvbiIsImNhdGVnb3J5SWQiLCJ1c2VySWQiLCJwb3N0IiwiaGVhZGVycyIsImxpa2VQb3N0IiwicG9zdElkIiwicHV0IiwiYWRkQ29tbWVudCIsImNvbW1lbnQiLCJwb3N0U2xpY2UiLCJuYW1lIiwiaW5pdGlhbFN0YXRlIiwicG9zdHMiLCJjdXJyZW50UG9zdCIsImxvYWRpbmciLCJyZWR1Y2VycyIsImNsZWFyRXJyb3IiLCJzdGF0ZSIsImNsZWFyUG9zdHMiLCJleHRyYVJlZHVjZXJzIiwiYnVpbGRlciIsImFkZENhc2UiLCJwZW5kaW5nIiwiZnVsZmlsbGVkIiwiYWN0aW9uIiwicGF5bG9hZCIsInJlamVjdGVkIiwidW5zaGlmdCIsImluZGV4IiwiZmluZEluZGV4IiwiX2lkIiwibGlrZSIsInB1c2giLCJhY3Rpb25zIiwicmVkdWNlciJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./redux/slices/postSlice.js\n"));

/***/ }),

/***/ "./redux/store.js":
/*!************************!*\
  !*** ./redux/store.js ***!
  \************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   store: function() { return /* binding */ store; }\n/* harmony export */ });\n/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @reduxjs/toolkit */ \"./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js\");\n/* harmony import */ var _slices_userSlice__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slices/userSlice */ \"./redux/slices/userSlice.js\");\n/* harmony import */ var _slices_cartSlice__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./slices/cartSlice */ \"./redux/slices/cartSlice.js\");\n/* harmony import */ var _slices_postSlice__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./slices/postSlice */ \"./redux/slices/postSlice.js\");\n\n\n\n\nconst store = (0,_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_3__.configureStore)({\n    reducer: {\n        user: _slices_userSlice__WEBPACK_IMPORTED_MODULE_0__[\"default\"],\n        cart: _slices_cartSlice__WEBPACK_IMPORTED_MODULE_1__[\"default\"],\n        posts: _slices_postSlice__WEBPACK_IMPORTED_MODULE_2__[\"default\"]\n    },\n    middleware: (getDefaultMiddleware)=>getDefaultMiddleware({\n            serializableCheck: false\n        })\n});\n/* harmony default export */ __webpack_exports__[\"default\"] = (store);\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9yZWR1eC9zdG9yZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUFrRDtBQUNMO0FBQ0E7QUFDQztBQUV2QyxNQUFNSSxRQUFRSixnRUFBY0EsQ0FBQztJQUNsQ0ssU0FBUztRQUNQQyxNQUFNTCx5REFBV0E7UUFDakJNLE1BQU1MLHlEQUFXQTtRQUNqQk0sT0FBT0wseURBQVlBO0lBQ3JCO0lBQ0FNLFlBQVksQ0FBQ0MsdUJBQ1hBLHFCQUFxQjtZQUNuQkMsbUJBQW1CO1FBQ3JCO0FBQ0osR0FBRztBQUVILCtEQUFlUCxLQUFLQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3JlZHV4L3N0b3JlLmpzPzM1NDkiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29uZmlndXJlU3RvcmUgfSBmcm9tIFwiQHJlZHV4anMvdG9vbGtpdFwiO1xyXG5pbXBvcnQgdXNlclJlZHVjZXIgZnJvbSBcIi4vc2xpY2VzL3VzZXJTbGljZVwiO1xyXG5pbXBvcnQgY2FydFJlZHVjZXIgZnJvbSBcIi4vc2xpY2VzL2NhcnRTbGljZVwiO1xyXG5pbXBvcnQgaW1hZ2VSZWR1Y2VyIGZyb20gXCIuL3NsaWNlcy9wb3N0U2xpY2VcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBzdG9yZSA9IGNvbmZpZ3VyZVN0b3JlKHtcclxuICByZWR1Y2VyOiB7XHJcbiAgICB1c2VyOiB1c2VyUmVkdWNlcixcclxuICAgIGNhcnQ6IGNhcnRSZWR1Y2VyLFxyXG4gICAgcG9zdHM6IGltYWdlUmVkdWNlcixcclxuICB9LFxyXG4gIG1pZGRsZXdhcmU6IChnZXREZWZhdWx0TWlkZGxld2FyZSkgPT5cclxuICAgIGdldERlZmF1bHRNaWRkbGV3YXJlKHtcclxuICAgICAgc2VyaWFsaXphYmxlQ2hlY2s6IGZhbHNlLFxyXG4gICAgfSksXHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgc3RvcmU7XHJcbiJdLCJuYW1lcyI6WyJjb25maWd1cmVTdG9yZSIsInVzZXJSZWR1Y2VyIiwiY2FydFJlZHVjZXIiLCJpbWFnZVJlZHVjZXIiLCJzdG9yZSIsInJlZHVjZXIiLCJ1c2VyIiwiY2FydCIsInBvc3RzIiwibWlkZGxld2FyZSIsImdldERlZmF1bHRNaWRkbGV3YXJlIiwic2VyaWFsaXphYmxlQ2hlY2siXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./redux/store.js\n"));

/***/ })

});