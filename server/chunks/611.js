exports.id = 611;
exports.ids = [611];
exports.modules = {

/***/ 5202:
/***/ ((module) => {

// Exports
module.exports = {
	"markdown": "markdown-styles_markdown__s5YX8"
};


/***/ }),

/***/ 9965:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({"src":"/_next/static/media/b4d5e297-fec9-42a9-a023-6b1b98fc7873.42eecbf7.png","height":640,"width":640,"blurDataURL":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAMAAADz0U65AAAAbFBMVEUtKh4uMjdIMysrIRw4MShZTz8mLCgCAgIZGBRBPS0RERDRkKCTaFzKztFFQzxkUUJPPTGbcnNeRUY8OEGHVleufZh2Wmw+QUjHj6h8Z4RHSG/Mr5mxoHuGio2tg493aUwxMmezhnaprbeFhYX/tkqiAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAARUlEQVQImQXBhQGAMBAEsKt+XXCnwP47kuBjOhepLF6mniCMhU61Bi4AaS/vBw4ktS9jB4l8H+vUO4MC1raZCI7OGDWZH3DrAz8mipfyAAAAAElFTkSuQmCC","blurWidth":8,"blurHeight":8});

/***/ }),

/***/ 9852:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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

/***/ 2786:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const Loader = ()=>{
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
        className: "flex items-center text-base font-bold",
        children: [
            /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
                className: "animate-spin mr-2 h-5 w-5 text-fore-primary",
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 24 24",
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("circle", {
                        className: "opacity-25",
                        cx: "12",
                        cy: "12",
                        r: "10",
                        stroke: "currentColor",
                        strokeWidth: "4"
                    }),
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("path", {
                        className: "opacity-75",
                        fill: "currentColor",
                        d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    })
                ]
            }),
            "Loading..."
        ]
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Loader);


/***/ }),

/***/ 4423:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _markdown_styles_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(5202);
/* harmony import */ var _markdown_styles_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_markdown_styles_module_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_markdown__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3135);
/* harmony import */ var next_legacy_image__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9755);
/* harmony import */ var next_legacy_image__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_legacy_image__WEBPACK_IMPORTED_MODULE_2__);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([react_markdown__WEBPACK_IMPORTED_MODULE_1__]);
react_markdown__WEBPACK_IMPORTED_MODULE_1__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




const components = {
    a: (a)=>{
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
            href: a.href,
            rel: "noopener noreferrer",
            target: "_blank",
            children: a.children
        });
    },
    img: (img)=>{
        return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_legacy_image__WEBPACK_IMPORTED_MODULE_2___default()), {
            src: img.src,
            alt: img.alt,
            width: 400,
            height: 300,
            quality: 50,
            layout: "responsive",
            objectFit: "contain",
            objectPosition: "center"
        });
    }
};
const PostBody = ({ content  })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "max-w-2xl mx-auto",
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx(react_markdown__WEBPACK_IMPORTED_MODULE_1__["default"], {
            className: (_markdown_styles_module_css__WEBPACK_IMPORTED_MODULE_3___default().markdown),
            components: components,
            children: content
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PostBody);

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ }),

/***/ 6393:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ components_PostHeader)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./src/components/Date.jsx
var components_Date = __webpack_require__(9852);
// EXTERNAL MODULE: ./node_modules/next/legacy/image.js
var legacy_image = __webpack_require__(9755);
var image_default = /*#__PURE__*/__webpack_require__.n(legacy_image);
;// CONCATENATED MODULE: ./src/components/CoverImage.jsx


const CoverImage = ({ title , url  })=>{
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "relative w-full my-4 pb-[55%]",
        children: /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
            src: url,
            quality: 60,
            alt: `Cover image for ${title}`,
            layout: "fill",
            objectFit: "cover",
            placeholder: "blur",
            blurDataURL: `${url}?auto=format,compress&q=1&blur=500&w=2`,
            priority: true
        })
    });
};
/* harmony default export */ const components_CoverImage = (CoverImage);

// EXTERNAL MODULE: ./src/components/PostTitle.jsx
var PostTitle = __webpack_require__(5864);
// EXTERNAL MODULE: ./src/configs/icons.jsx
var icons = __webpack_require__(3612);
// EXTERNAL MODULE: ./public/images/b4d5e297-fec9-42a9-a023-6b1b98fc7873.png
var b4d5e297_fec9_42a9_a023_6b1b98fc7873 = __webpack_require__(9965);
;// CONCATENATED MODULE: ./src/components/PostHeader.jsx







const PostHeader = ({ post  })=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(PostTitle/* default */.Z, {
                children: post.title
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "flex items-center mb-8",
                children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "flex items-center relative",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                            src: b4d5e297_fec9_42a9_a023_6b1b98fc7873/* default */.Z,
                            width: 42,
                            height: 42,
                            alt: "Diogo Felizardo",
                            className: "rounded-full",
                            placeholder: "blur"
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                            className: "ml-2 text-sm",
                            children: [
                                "Diogo Felizardo |",
                                " ",
                                /*#__PURE__*/ jsx_runtime_.jsx(components_Date/* default */.Z, {
                                    dateString: post.created_at,
                                    formatStyle: "LLLL dd, yyyy"
                                }),
                                " |",
                                " ",
                                post.metadata.category.title
                            ]
                        })
                    ]
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(components_CoverImage, {
                title: post.title,
                url: post.metadata.cover_image.imgix_url
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "flex flex-row justify-between sm:items-center pb-8 border-b",
                children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: "sm:flex items-center gap-x-2",
                    children: post.metadata.live_url ? /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
                        children: [
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                                href: post.metadata.live_url,
                                target: "_blank",
                                rel: "noreferrer",
                                className: "flex items-center text-accent hover:text-gray-500 text-sm md:ml-4 w-fit",
                                children: [
                                    "Live Site",
                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(icons/* ExternalLinkIcon */.h0, {})
                                    })
                                ]
                            }),
                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
                                href: post.metadata.repo_url,
                                target: "_blank",
                                rel: "noreferrer",
                                className: "flex items-center text-accent hover:text-gray-500 text-sm",
                                children: [
                                    "Github Repo",
                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                        children: /*#__PURE__*/ jsx_runtime_.jsx(icons/* ExternalLinkIcon */.h0, {})
                                    })
                                ]
                            })
                        ]
                    }) : undefined
                })
            })
        ]
    });
};
/* harmony default export */ const components_PostHeader = (PostHeader);


/***/ }),

/***/ 5864:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const PostTitle = ({ children  })=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
        className: "text-fore-primary text-3xl sm:text-4xl md:text-5xl font-bold tracking-normal leading-tight md:leading-none mb-12 mt-4",
        children: children
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PostTitle);


/***/ })

};
;