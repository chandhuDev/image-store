"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "./components/Home/UploadModal.js":
/*!****************************************!*\
  !*** ./components/Home/UploadModal.js ***!
  \****************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var react_toastify__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-toastify */ \"./node_modules/react-toastify/dist/react-toastify.esm.mjs\");\n/* harmony import */ var _redux_slices_postSlice__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../redux/slices/postSlice */ \"./redux/slices/postSlice.js\");\n/* harmony import */ var _Spinner__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Spinner */ \"./components/Home/Spinner.js\");\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\n\n\nconst UploadModal = (param)=>{\n    let { isOpen, onClose } = param;\n    _s();\n    const [file, setFile] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(null);\n    const [title, setTitle] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [price, setPrice] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(\"\");\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(false);\n    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch)();\n    const handleSubmit = async (e)=>{\n        e.preventDefault();\n        if (!file || !title || !price) {\n            react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.error(\"Please fill all fields\");\n            return;\n        }\n        const formData = new FormData();\n        formData.append(\"image\", file);\n        formData.append(\"title\", title);\n        formData.append(\"price\", price);\n        setLoading(true);\n        try {\n            await dispatch((0,_redux_slices_postSlice__WEBPACK_IMPORTED_MODULE_4__.uploadImage)(formData)).unwrap();\n            react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.success(\"Image uploaded successfully\");\n            onClose();\n        } catch (error) {\n            react_toastify__WEBPACK_IMPORTED_MODULE_3__.toast.error(error.message || \"Upload failed\");\n        } finally{\n            setLoading(false);\n        }\n    };\n    if (!isOpen) return null;\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n            className: \"bg-white rounded-lg p-8 max-w-md w-full\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                    className: \"text-2xl font-bold mb-6\",\n                    children: \"Upload Image\"\n                }, void 0, false, {\n                    fileName: \"E:\\\\image-ecommerce-nextjs\\\\components\\\\Home\\\\UploadModal.js\",\n                    lineNumber: 44,\n                    columnNumber: 9\n                }, undefined),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"form\", {\n                    onSubmit: handleSubmit,\n                    className: \"space-y-4\",\n                    children: [\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                                    className: \"block text-sm font-medium text-gray-700\",\n                                    children: \"Image\"\n                                }, void 0, false, {\n                                    fileName: \"E:\\\\image-ecommerce-nextjs\\\\components\\\\Home\\\\UploadModal.js\",\n                                    lineNumber: 48,\n                                    columnNumber: 13\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                    type: \"file\",\n                                    accept: \"image/*\",\n                                    onChange: (e)=>setFile(e.target.files[0]),\n                                    className: \"mt-1 block w-full\"\n                                }, void 0, false, {\n                                    fileName: \"E:\\\\image-ecommerce-nextjs\\\\components\\\\Home\\\\UploadModal.js\",\n                                    lineNumber: 51,\n                                    columnNumber: 13\n                                }, undefined)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"E:\\\\image-ecommerce-nextjs\\\\components\\\\Home\\\\UploadModal.js\",\n                            lineNumber: 47,\n                            columnNumber: 11\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                                    className: \"block text-sm font-medium text-gray-700\",\n                                    children: \"Title\"\n                                }, void 0, false, {\n                                    fileName: \"E:\\\\image-ecommerce-nextjs\\\\components\\\\Home\\\\UploadModal.js\",\n                                    lineNumber: 60,\n                                    columnNumber: 13\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                    type: \"text\",\n                                    value: title,\n                                    onChange: (e)=>setTitle(e.target.value),\n                                    className: \"mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500\"\n                                }, void 0, false, {\n                                    fileName: \"E:\\\\image-ecommerce-nextjs\\\\components\\\\Home\\\\UploadModal.js\",\n                                    lineNumber: 63,\n                                    columnNumber: 13\n                                }, undefined)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"E:\\\\image-ecommerce-nextjs\\\\components\\\\Home\\\\UploadModal.js\",\n                            lineNumber: 59,\n                            columnNumber: 11\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"label\", {\n                                    className: \"block text-sm font-medium text-gray-700\",\n                                    children: \"Price ($)\"\n                                }, void 0, false, {\n                                    fileName: \"E:\\\\image-ecommerce-nextjs\\\\components\\\\Home\\\\UploadModal.js\",\n                                    lineNumber: 72,\n                                    columnNumber: 13\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                                    type: \"number\",\n                                    value: price,\n                                    onChange: (e)=>setPrice(e.target.value),\n                                    className: \"mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500\"\n                                }, void 0, false, {\n                                    fileName: \"E:\\\\image-ecommerce-nextjs\\\\components\\\\Home\\\\UploadModal.js\",\n                                    lineNumber: 75,\n                                    columnNumber: 13\n                                }, undefined)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"E:\\\\image-ecommerce-nextjs\\\\components\\\\Home\\\\UploadModal.js\",\n                            lineNumber: 71,\n                            columnNumber: 11\n                        }, undefined),\n                        /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                            className: \"flex justify-end space-x-4\",\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                    type: \"button\",\n                                    onClick: onClose,\n                                    className: \"px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md\",\n                                    children: \"Cancel\"\n                                }, void 0, false, {\n                                    fileName: \"E:\\\\image-ecommerce-nextjs\\\\components\\\\Home\\\\UploadModal.js\",\n                                    lineNumber: 84,\n                                    columnNumber: 13\n                                }, undefined),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                                    type: \"submit\",\n                                    disabled: loading,\n                                    className: \"px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md\",\n                                    children: loading ? /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Spinner__WEBPACK_IMPORTED_MODULE_5__[\"default\"], {}, void 0, false, {\n                                        fileName: \"E:\\\\image-ecommerce-nextjs\\\\components\\\\Home\\\\UploadModal.js\",\n                                        lineNumber: 96,\n                                        columnNumber: 26\n                                    }, undefined) : \"Upload\"\n                                }, void 0, false, {\n                                    fileName: \"E:\\\\image-ecommerce-nextjs\\\\components\\\\Home\\\\UploadModal.js\",\n                                    lineNumber: 91,\n                                    columnNumber: 13\n                                }, undefined)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"E:\\\\image-ecommerce-nextjs\\\\components\\\\Home\\\\UploadModal.js\",\n                            lineNumber: 83,\n                            columnNumber: 11\n                        }, undefined)\n                    ]\n                }, void 0, true, {\n                    fileName: \"E:\\\\image-ecommerce-nextjs\\\\components\\\\Home\\\\UploadModal.js\",\n                    lineNumber: 46,\n                    columnNumber: 9\n                }, undefined)\n            ]\n        }, void 0, true, {\n            fileName: \"E:\\\\image-ecommerce-nextjs\\\\components\\\\Home\\\\UploadModal.js\",\n            lineNumber: 43,\n            columnNumber: 7\n        }, undefined)\n    }, void 0, false, {\n        fileName: \"E:\\\\image-ecommerce-nextjs\\\\components\\\\Home\\\\UploadModal.js\",\n        lineNumber: 42,\n        columnNumber: 5\n    }, undefined);\n};\n_s(UploadModal, \"Ivud1y3izau+pbHeEn6jKEIopRs=\", false, function() {\n    return [\n        react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch\n    ];\n});\n_c = UploadModal;\n/* harmony default export */ __webpack_exports__[\"default\"] = (UploadModal);\nvar _c;\n$RefreshReg$(_c, \"UploadModal\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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b2RhbC5qcz9iODA0Il0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIGNsaWVudFwiO1xyXG5pbXBvcnQgeyB1c2VTdGF0ZSB9IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQgeyB1c2VEaXNwYXRjaCB9IGZyb20gXCJyZWFjdC1yZWR1eFwiO1xyXG5pbXBvcnQgeyB0b2FzdCB9IGZyb20gXCJyZWFjdC10b2FzdGlmeVwiO1xyXG5pbXBvcnQgeyB1cGxvYWRJbWFnZSB9IGZyb20gXCIuLi8uLi9yZWR1eC9zbGljZXMvcG9zdFNsaWNlXCI7XHJcbmltcG9ydCBMb2FkaW5nU3Bpbm5lciBmcm9tIFwiLi9TcGlubmVyXCI7XHJcblxyXG5jb25zdCBVcGxvYWRNb2RhbCA9ICh7IGlzT3Blbiwgb25DbG9zZSB9KSA9PiB7XHJcbiAgY29uc3QgW2ZpbGUsIHNldEZpbGVdID0gdXNlU3RhdGUobnVsbCk7XHJcbiAgY29uc3QgW3RpdGxlLCBzZXRUaXRsZV0gPSB1c2VTdGF0ZShcIlwiKTtcclxuICBjb25zdCBbcHJpY2UsIHNldFByaWNlXSA9IHVzZVN0YXRlKFwiXCIpO1xyXG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKGZhbHNlKTtcclxuICBjb25zdCBkaXNwYXRjaCA9IHVzZURpc3BhdGNoKCk7XHJcblxyXG4gIGNvbnN0IGhhbmRsZVN1Ym1pdCA9IGFzeW5jIChlKSA9PiB7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICBpZiAoIWZpbGUgfHwgIXRpdGxlIHx8ICFwcmljZSkge1xyXG4gICAgICB0b2FzdC5lcnJvcihcIlBsZWFzZSBmaWxsIGFsbCBmaWVsZHNcIik7XHJcbiAgICAgIHJldHVybjtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgZm9ybURhdGEuYXBwZW5kKFwiaW1hZ2VcIiwgZmlsZSk7XHJcbiAgICBmb3JtRGF0YS5hcHBlbmQoXCJ0aXRsZVwiLCB0aXRsZSk7XHJcbiAgICBmb3JtRGF0YS5hcHBlbmQoXCJwcmljZVwiLCBwcmljZSk7XHJcblxyXG4gICAgc2V0TG9hZGluZyh0cnVlKTtcclxuICAgIHRyeSB7XHJcbiAgICAgIGF3YWl0IGRpc3BhdGNoKHVwbG9hZEltYWdlKGZvcm1EYXRhKSkudW53cmFwKCk7XHJcbiAgICAgIHRvYXN0LnN1Y2Nlc3MoXCJJbWFnZSB1cGxvYWRlZCBzdWNjZXNzZnVsbHlcIik7XHJcbiAgICAgIG9uQ2xvc2UoKTtcclxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XHJcbiAgICAgIHRvYXN0LmVycm9yKGVycm9yLm1lc3NhZ2UgfHwgXCJVcGxvYWQgZmFpbGVkXCIpO1xyXG4gICAgfSBmaW5hbGx5IHtcclxuICAgICAgc2V0TG9hZGluZyhmYWxzZSk7XHJcbiAgICB9XHJcbiAgfTtcclxuXHJcbiAgaWYgKCFpc09wZW4pIHJldHVybiBudWxsO1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJmaXhlZCBpbnNldC0wIGJnLWJsYWNrIGJnLW9wYWNpdHktNTAgZmxleCBpdGVtcy1jZW50ZXIganVzdGlmeS1jZW50ZXIgei01MFwiPlxyXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cImJnLXdoaXRlIHJvdW5kZWQtbGcgcC04IG1heC13LW1kIHctZnVsbFwiPlxyXG4gICAgICAgIDxoMiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LWJvbGQgbWItNlwiPlVwbG9hZCBJbWFnZTwvaDI+XHJcblxyXG4gICAgICAgIDxmb3JtIG9uU3VibWl0PXtoYW5kbGVTdWJtaXR9IGNsYXNzTmFtZT1cInNwYWNlLXktNFwiPlxyXG4gICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMFwiPlxyXG4gICAgICAgICAgICAgIEltYWdlXHJcbiAgICAgICAgICAgIDwvbGFiZWw+XHJcbiAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgIHR5cGU9XCJmaWxlXCJcclxuICAgICAgICAgICAgICBhY2NlcHQ9XCJpbWFnZS8qXCJcclxuICAgICAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldEZpbGUoZS50YXJnZXQuZmlsZXNbMF0pfVxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm10LTEgYmxvY2sgdy1mdWxsXCJcclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9XCJibG9jayB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDBcIj5cclxuICAgICAgICAgICAgICBUaXRsZVxyXG4gICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICB0eXBlPVwidGV4dFwiXHJcbiAgICAgICAgICAgICAgdmFsdWU9e3RpdGxlfVxyXG4gICAgICAgICAgICAgIG9uQ2hhbmdlPXsoZSkgPT4gc2V0VGl0bGUoZS50YXJnZXQudmFsdWUpfVxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm10LTEgYmxvY2sgdy1mdWxsIHJvdW5kZWQtbWQgYm9yZGVyLWdyYXktMzAwIHNoYWRvdy1zbSBmb2N1czpib3JkZXItaW5kaWdvLTUwMCBmb2N1czpyaW5nLWluZGlnby01MDBcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgPGxhYmVsIGNsYXNzTmFtZT1cImJsb2NrIHRleHQtc20gZm9udC1tZWRpdW0gdGV4dC1ncmF5LTcwMFwiPlxyXG4gICAgICAgICAgICAgIFByaWNlICgkKVxyXG4gICAgICAgICAgICA8L2xhYmVsPlxyXG4gICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICB0eXBlPVwibnVtYmVyXCJcclxuICAgICAgICAgICAgICB2YWx1ZT17cHJpY2V9XHJcbiAgICAgICAgICAgICAgb25DaGFuZ2U9eyhlKSA9PiBzZXRQcmljZShlLnRhcmdldC52YWx1ZSl9XHJcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibXQtMSBibG9jayB3LWZ1bGwgcm91bmRlZC1tZCBib3JkZXItZ3JheS0zMDAgc2hhZG93LXNtIGZvY3VzOmJvcmRlci1pbmRpZ28tNTAwIGZvY3VzOnJpbmctaW5kaWdvLTUwMFwiXHJcbiAgICAgICAgICAgIC8+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1lbmQgc3BhY2UteC00XCI+XHJcbiAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcclxuICAgICAgICAgICAgICBvbkNsaWNrPXtvbkNsb3NlfVxyXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cInB4LTQgcHktMiB0ZXh0LXNtIGZvbnQtbWVkaXVtIHRleHQtZ3JheS03MDAgaG92ZXI6YmctZ3JheS0xMDAgcm91bmRlZC1tZFwiXHJcbiAgICAgICAgICAgID5cclxuICAgICAgICAgICAgICBDYW5jZWxcclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgIDxidXR0b25cclxuICAgICAgICAgICAgICB0eXBlPVwic3VibWl0XCJcclxuICAgICAgICAgICAgICBkaXNhYmxlZD17bG9hZGluZ31cclxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJweC00IHB5LTIgdGV4dC1zbSBmb250LW1lZGl1bSB0ZXh0LXdoaXRlIGJnLWluZGlnby02MDAgaG92ZXI6YmctaW5kaWdvLTcwMCByb3VuZGVkLW1kXCJcclxuICAgICAgICAgICAgPlxyXG4gICAgICAgICAgICAgIHtsb2FkaW5nID8gPExvYWRpbmdTcGlubmVyIC8+IDogXCJVcGxvYWRcIn1cclxuICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICA8L2Zvcm0+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgPC9kaXY+XHJcbiAgKTtcclxufTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IFVwbG9hZE1vZGFsO1xyXG4iXSwibmFtZXMiOlsidXNlU3RhdGUiLCJ1c2VEaXNwYXRjaCIsInRvYXN0IiwidXBsb2FkSW1hZ2UiLCJMb2FkaW5nU3Bpbm5lciIsIlVwbG9hZE1vZGFsIiwiaXNPcGVuIiwib25DbG9zZSIsImZpbGUiLCJzZXRGaWxlIiwidGl0bGUiLCJzZXRUaXRsZSIsInByaWNlIiwic2V0UHJpY2UiLCJsb2FkaW5nIiwic2V0TG9hZGluZyIsImRpc3BhdGNoIiwiaGFuZGxlU3VibWl0IiwiZSIsInByZXZlbnREZWZhdWx0IiwiZXJyb3IiLCJmb3JtRGF0YSIsIkZvcm1EYXRhIiwiYXBwZW5kIiwidW53cmFwIiwic3VjY2VzcyIsIm1lc3NhZ2UiLCJkaXYiLCJjbGFzc05hbWUiLCJoMiIsImZvcm0iLCJvblN1Ym1pdCIsImxhYmVsIiwiaW5wdXQiLCJ0eXBlIiwiYWNjZXB0Iiwib25DaGFuZ2UiLCJ0YXJnZXQiLCJmaWxlcyIsInZhbHVlIiwiYnV0dG9uIiwib25DbGljayIsImRpc2FibGVkIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/Home/UploadModal.js\n"));

/***/ }),

/***/ "./pages/index.js":
/*!************************!*\
  !*** ./pages/index.js ***!
  \************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Home; }\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ \"./node_modules/react-redux/es/index.js\");\n/* harmony import */ var _redux_slices_postSlice__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../redux/slices/postSlice */ \"./redux/slices/postSlice.js\");\n/* harmony import */ var _components_Home_ImageGrid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/Home/ImageGrid */ \"./components/Home/ImageGrid.js\");\n/* harmony import */ var _components_Home_UploadModal__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/Home/UploadModal */ \"./components/Home/UploadModal.js\");\n/* harmony import */ var _components_Home_Spinner__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/Home/Spinner */ \"./components/Home/Spinner.js\");\n\nvar _s = $RefreshSig$();\n\n\n // Updated import\n\n\n\nfunction Home() {\n    _s();\n    const dispatch = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch)();\n    const { posts, loading } = (0,react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector)((state)=>state.posts); // Updated selector\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)(()=>{\n        dispatch((0,_redux_slices_postSlice__WEBPACK_IMPORTED_MODULE_3__.fetchPosts)()); // Updated function call\n    }, [\n        dispatch\n    ]);\n    if (loading) return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Home_Spinner__WEBPACK_IMPORTED_MODULE_6__[\"default\"], {}, void 0, false, {\n        fileName: \"E:\\\\image-ecommerce-nextjs\\\\pages\\\\index.js\",\n        lineNumber: 16,\n        columnNumber: 23\n    }, this);\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"min-h-screen bg-gray-100\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_Home_ImageGrid__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {\n                posts: posts\n            }, void 0, false, {\n                fileName: \"E:\\\\image-ecommerce-nextjs\\\\pages\\\\index.js\",\n                lineNumber: 20,\n                columnNumber: 7\n            }, this),\n            \" // Updated prop name\"\n        ]\n    }, void 0, true, {\n        fileName: \"E:\\\\image-ecommerce-nextjs\\\\pages\\\\index.js\",\n        lineNumber: 19,\n        columnNumber: 5\n    }, this);\n}\n_s(Home, \"HJiWwXPljZOa8PWonxZ3h1Tw/bY=\", false, function() {\n    return [\n        react_redux__WEBPACK_IMPORTED_MODULE_2__.useDispatch,\n        react_redux__WEBPACK_IMPORTED_MODULE_2__.useSelector\n    ];\n});\n_c = Home;\nvar _c;\n$RefreshReg$(_c, \"Home\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9pbmRleC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBa0M7QUFDcUI7QUFDQSxDQUFDLGlCQUFpQjtBQUNwQjtBQUNJO0FBQ0Q7QUFFekMsU0FBU087O0lBQ3RCLE1BQU1DLFdBQVdQLHdEQUFXQTtJQUM1QixNQUFNLEVBQUVRLEtBQUssRUFBRUMsT0FBTyxFQUFFLEdBQUdSLHdEQUFXQSxDQUFDLENBQUNTLFFBQVVBLE1BQU1GLEtBQUssR0FBRyxtQkFBbUI7SUFFbkZULGdEQUFTQSxDQUFDO1FBQ1JRLFNBQVNMLG1FQUFVQSxLQUFLLHdCQUF3QjtJQUNsRCxHQUFHO1FBQUNLO0tBQVM7SUFFYixJQUFJRSxTQUFTLHFCQUFPLDhEQUFDSixnRUFBY0E7Ozs7O0lBRW5DLHFCQUNFLDhEQUFDTTtRQUFJQyxXQUFVOzswQkFDYiw4REFBQ1Qsa0VBQVNBO2dCQUFDSyxPQUFPQTs7Ozs7O1lBQVM7Ozs7Ozs7QUFHakM7R0Fmd0JGOztRQUNMTixvREFBV0E7UUFDREMsb0RBQVdBOzs7S0FGaEJLIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vX05fRS8uL3BhZ2VzL2luZGV4LmpzP2JlZTciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSBcInJlYWN0XCI7XHJcbmltcG9ydCB7IHVzZURpc3BhdGNoLCB1c2VTZWxlY3RvciB9IGZyb20gXCJyZWFjdC1yZWR1eFwiO1xyXG5pbXBvcnQgeyBmZXRjaFBvc3RzIH0gZnJvbSBcIi4uL3JlZHV4L3NsaWNlcy9wb3N0U2xpY2VcIjsgLy8gVXBkYXRlZCBpbXBvcnRcclxuaW1wb3J0IEltYWdlR3JpZCBmcm9tIFwiLi4vY29tcG9uZW50cy9Ib21lL0ltYWdlR3JpZFwiO1xyXG5pbXBvcnQgVXBsb2FkTW9kYWwgZnJvbSBcIi4uL2NvbXBvbmVudHMvSG9tZS9VcGxvYWRNb2RhbFwiO1xyXG5pbXBvcnQgTG9hZGluZ1NwaW5uZXIgZnJvbSBcIi4uL2NvbXBvbmVudHMvSG9tZS9TcGlubmVyXCI7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBIb21lKCkge1xyXG4gIGNvbnN0IGRpc3BhdGNoID0gdXNlRGlzcGF0Y2goKTtcclxuICBjb25zdCB7IHBvc3RzLCBsb2FkaW5nIH0gPSB1c2VTZWxlY3Rvcigoc3RhdGUpID0+IHN0YXRlLnBvc3RzKTsgLy8gVXBkYXRlZCBzZWxlY3RvclxyXG5cclxuICB1c2VFZmZlY3QoKCkgPT4ge1xyXG4gICAgZGlzcGF0Y2goZmV0Y2hQb3N0cygpKTsgLy8gVXBkYXRlZCBmdW5jdGlvbiBjYWxsXHJcbiAgfSwgW2Rpc3BhdGNoXSk7XHJcblxyXG4gIGlmIChsb2FkaW5nKSByZXR1cm4gPExvYWRpbmdTcGlubmVyIC8+O1xyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJtaW4taC1zY3JlZW4gYmctZ3JheS0xMDBcIj5cclxuICAgICAgPEltYWdlR3JpZCBwb3N0cz17cG9zdHN9IC8+IC8vIFVwZGF0ZWQgcHJvcCBuYW1lXHJcbiAgICA8L2Rpdj5cclxuICApO1xyXG59XHJcbiJdLCJuYW1lcyI6WyJ1c2VFZmZlY3QiLCJ1c2VEaXNwYXRjaCIsInVzZVNlbGVjdG9yIiwiZmV0Y2hQb3N0cyIsIkltYWdlR3JpZCIsIlVwbG9hZE1vZGFsIiwiTG9hZGluZ1NwaW5uZXIiLCJIb21lIiwiZGlzcGF0Y2giLCJwb3N0cyIsImxvYWRpbmciLCJzdGF0ZSIsImRpdiIsImNsYXNzTmFtZSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/index.js\n"));

/***/ })

});