"use strict";
(() => {
var exports = {};
exports.id = 679;
exports.ids = [679,197];
exports.modules = {

/***/ 9336:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getStaticProps": () => (/* binding */ getStaticProps)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _lib_cosmic__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3287);
/* harmony import */ var _components_PostList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9007);
/* harmony import */ var _components_Meta__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8012);
/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8157);






const Posts = ({ allPosts , allPostCategories , preview  })=>{
    const [filterCategory, setFilterCategory] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)("All");
    const filteredPosts = allPosts.filter((post)=>post.metadata.category.title === filterCategory);
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_Meta__WEBPACK_IMPORTED_MODULE_4__/* .PageMeta */ .Vj, {
                title: "Posts | Developer Portfolio",
                description: "The blog posts of this developer"
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(_components_Layout__WEBPACK_IMPORTED_MODULE_5__/* ["default"] */ .Z, {
                preview: preview,
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                        className: "text-2xl md:text-3xl text-fore-primary font-bold",
                        children: "Posts"
                    }),
                    /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("ul", {
                        className: "flex flex-wrap gap-y-2 sm:gap-y-0 gap-x-4 my-4",
                        children: [
                            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                className: "All" === filterCategory ? "cursor-pointer font-bold filter--active transition" : "cursor-pointer text-fore-subtle transition",
                                onClick: ()=>setFilterCategory("All"),
                                children: "All"
                            }, "All"),
                            allPostCategories.map((category)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("li", {
                                    className: category.title === filterCategory ? "cursor-pointer font-bold filter--active transition" : "cursor-pointer text-fore-subtle transition hover:text-accent",
                                    onClick: ()=>setFilterCategory(category.title),
                                    children: category.title
                                }, category.title))
                        ]
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_components_PostList__WEBPACK_IMPORTED_MODULE_3__/* ["default"] */ .Z, {
                        allPosts: filterCategory === "All" ? allPosts : filteredPosts,
                        postType: "posts",
                        home: false
                    })
                ]
            })
        ]
    });
};
async function getStaticProps({ preview =null  }) {
    const allPosts = await (0,_lib_cosmic__WEBPACK_IMPORTED_MODULE_2__/* .getAllPosts */ .Bd)(preview, "posts") || [];
    const allPostCategories = await (0,_lib_cosmic__WEBPACK_IMPORTED_MODULE_2__/* .getAllCategories */ .tG)("post-categories") || [];
    return {
        props: {
            allPosts,
            allPostCategories,
            preview
        },
        revalidate: 60
    };
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Posts);


/***/ }),

/***/ 5422:
/***/ ((module) => {

module.exports = require("cosmicjs");

/***/ }),

/***/ 4146:
/***/ ((module) => {

module.exports = require("date-fns");

/***/ }),

/***/ 1162:
/***/ ((module) => {

module.exports = require("next-themes");

/***/ }),

/***/ 3280:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 4964:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router-context.js");

/***/ }),

/***/ 1751:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/add-path-prefix.js");

/***/ }),

/***/ 3938:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/format-url.js");

/***/ }),

/***/ 1109:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/is-local-url.js");

/***/ }),

/***/ 8854:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/parse-path.js");

/***/ }),

/***/ 3297:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/remove-trailing-slash.js");

/***/ }),

/***/ 7782:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/router/utils/resolve-href.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 968:
/***/ ((module) => {

module.exports = require("next/head");

/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [664,612,827,7], () => (__webpack_exec__(9336)));
module.exports = __webpack_exports__;

})();