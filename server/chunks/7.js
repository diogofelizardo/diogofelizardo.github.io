"use strict";
exports.id = 7;
exports.ids = [7];
exports.modules = {

/***/ 9852:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4146);
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(date_fns__WEBPACK_IMPORTED_MODULE_1__);


const Date = ({ dateString , formatStyle  })=>{
    const date = (0,date_fns__WEBPACK_IMPORTED_MODULE_1__.parseISO)(dateString);
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("time", {
        dateTime: dateString,
        children: (0,date_fns__WEBPACK_IMPORTED_MODULE_1__.format)(date, formatStyle)
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Date);


/***/ }),

/***/ 9007:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Date__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9852);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _configs_icons__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(3612);




const PostList = ({ allPosts , postType , home  })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("ul", {
            className: !home ? "grid grid-cols-1 md:grid-cols-2 gap-8" : undefined,
            children: allPosts.map((post)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                    className: home ? "py-5" : "flex flex-col bg-white dark:bg-gray-800 rounded shadow-sm hover:shadow-md transition-all relative",
                    children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_link__WEBPACK_IMPORTED_MODULE_2___default()), {
                        href: `/${postType}/${post.slug}`,
                        className: home ? "group flex flex-col lg:flex-row lg:items-center lg:justify-between px-8 py-5 -my-5 -mx-7 hover:bg-back-subtle transition-colors border-b-2" : "group flex flex-col justify-start gap-y-6 p-8 h-full",
                        children: [
                            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                                className: "max-w-lg",
                                children: [
                                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h3", {
                                        className: "text-xl font-bold mb-1 group-hover:text-accent transition-colors",
                                        children: [
                                            post.title,
                                            " ",
                                            post.status === "draft" && home && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                                className: "text-fore-subtle ml-2",
                                                children: "(Draft)"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("p", {
                                        className: "text-fore-subtle mb-3 lg:mb-0 lg:pr-6",
                                        children: post.metadata.excerpt
                                    })
                                ]
                            }),
                            home ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_Date__WEBPACK_IMPORTED_MODULE_1__/* ["default"] */ .Z, {
                                dateString: post.created_at,
                                formatStyle: "LLLL, yyyy"
                            }) : /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
                                className: "flex items-center text-fore-subtle text-sm",
                                children: [
                                    "Read more",
                                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "group hidden group-hover:block ml-2",
                                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_configs_icons__WEBPACK_IMPORTED_MODULE_3__/* .ForwardArrowIcon */ .RC, {})
                                    }),
                                    post.status === "draft" && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                                        className: "absolute right-1 top-1 bg-back-subtle px-3 py-1 rounded text-accent",
                                        children: "Draft"
                                    })
                                ]
                            })
                        ]
                    })
                }, post.title))
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PostList);


/***/ })

};
;