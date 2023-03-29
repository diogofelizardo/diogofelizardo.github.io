"use strict";
exports.id = 318;
exports.ids = [318];
exports.modules = {

/***/ 9965:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"src":"/_next/static/media/b4d5e297-fec9-42a9-a023-6b1b98fc7873.42eecbf7.png","height":640,"width":640,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAAbFBMVEUtKh4uMjdIMysrIRw4MShZTz8mLCgCAgIZGBRBPS0RERDRkKCTaFzKztFFQzxkUUJPPTGbcnNeRUY8OEGHVleufZh2Wmw+QUjHj6h8Z4RHSG/Mr5mxoHuGio2tg493aUwxMmezhnaprbeFhYX/tkqiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAARUlEQVQImQXBhQGAMBAEsKt+XXCnwP47kuBjOhepLF6mniCMhU61Bi4AaS/vBw4ktS9jB4l8H+vUO4MC1raZCI7OGDWZH3DrAz8mipfyAAAAAElFTkSuQmCC","blurWidth":8,"blurHeight":8});

/***/ }),

/***/ 579:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _configs_icons__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3612);


const Socials = ({ resume , email , github , linkedin  })=>{
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "flex items-center",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
                href: resume,
                target: "_blank",
                rel: "noreferrer",
                className: "flex items-center mr-4 text-fore-primary border-2 border-accent w-fit px-4 py-1 rounded cursor-pointer hover:text-accent transition-colors",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("span", {
                        className: "mr-2",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_configs_icons__WEBPACK_IMPORTED_MODULE_1__/* .PaperIcon */ .At, {})
                    }),
                    "Resume"
                ]
            }),
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
                className: "flex gap-x-5 ml-2",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                        href: `mailto:${email}`,
                        className: "group cursor-pointer",
                        "aria-label": "Email",
                        title: "Email",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_configs_icons__WEBPACK_IMPORTED_MODULE_1__/* .EmailIcon */ .LQ, {})
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                        href: `https://github.com/${github}`,
                        className: "group cursor-pointer",
                        "aria-label": "Github",
                        title: "Github",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_configs_icons__WEBPACK_IMPORTED_MODULE_1__/* .GithubIcon */ .ET, {})
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                        href: `https://www.linkedin.com/in/${linkedin}`,
                        className: "group cursor-pointer",
                        "aria-label": "Linkedin",
                        title: "Linkedin",
                        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(_configs_icons__WEBPACK_IMPORTED_MODULE_1__/* .LinkedinIcon */ .pA, {})
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Socials);


/***/ })

};
;