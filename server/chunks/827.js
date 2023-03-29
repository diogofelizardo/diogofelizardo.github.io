"use strict";
exports.id = 827;
exports.ids = [827];
exports.modules = {

/***/ 3149:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1664);
/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);


const AlertPreview = ()=>{
    return /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
        className: "absolute w-full z-20 top-28 md:top-20 left-0 text-fore-subtle bg-back-subtle px-8",
        children: /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
            className: "py-2 text-center text-sm",
            children: /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
                children: [
                    "You're in preview mode.",
                    " ",
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {
                        href: "/api/exit-preview",
                        className: "underline hover:text-accent transition-colors cursor-pointer",
                        children: "Click here"
                    }),
                    " ",
                    "to exit."
                ]
            })
        })
    });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (AlertPreview);


/***/ }),

/***/ 8157:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ components_Layout)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./src/configs/icons.jsx
var icons = __webpack_require__(3612);
// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
;// CONCATENATED MODULE: ./src/components/MenuItems.jsx



const routes = [
    {
        path: "/",
        label: "Home"
    },
    {
        path: "/posts",
        label: "Posts"
    },
    {
        path: "/works",
        label: "Works"
    },
    {
        path: "/about",
        label: "About"
    }
];
const MenuItems = ()=>{
    const removeFocus = (e)=>{
        e.currentTarget.blur();
    };
    const currentRoute = (0,router_.useRouter)().pathname;
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
            className: "relative items-center justify-start flex-grow hidden space-x-6 md:flex",
            children: routes.map((route)=>/*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                    href: route.path,
                    className: route.path === currentRoute ? "text-fore-primary transition-colors font-bold tracking-wide" : "text-fore-subtle transition-colors tracking-wide nav--item",
                    onClick: removeFocus,
                    children: route.label
                }, route.path))
        })
    });
};
/* harmony default export */ const components_MenuItems = (MenuItems);

;// CONCATENATED MODULE: ./src/components/Footer.jsx



const Footer = ()=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("footer", {
        className: "flex flex-col items-center md:items-stretch max-w-screen-lg mx-auto gap-y-6 py-12 px-6 md:px-12 lg:px-20",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "flex flex-col items-center md:flex-row md:justify-between gap-y-6 md:gap-y-0",
                children: /*#__PURE__*/ jsx_runtime_.jsx(components_MenuItems, {})
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "flex flex-col-reverse md:flex-row items-center md:justify-between gap-y-6 md:gap-y-0",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                        className: "text-sm",
                        children: [
                            "\xa9 ",
                            new Date().getFullYear(),
                            " Developer Portfolio All Rights Reserved."
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                        className: "flex items-center text-sm",
                        children: [
                            "Powered by",
                            /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                href: "https://www.cosmicjs.com/",
                                target: "_blank",
                                rel: "noreferrer",
                                className: "ml-2",
                                children: /*#__PURE__*/ jsx_runtime_.jsx(icons/* CosmicIcon */.Tf, {})
                            })
                        ]
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const components_Footer = (Footer);

// EXTERNAL MODULE: ./src/components/Meta.jsx
var Meta = __webpack_require__(8012);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: external "next-themes"
var external_next_themes_ = __webpack_require__(1162);
;// CONCATENATED MODULE: ./src/components/ThemeChanger.jsx



const ThemeChanger = ({ styles  })=>{
    const [mounted, setMounted] = (0,external_react_.useState)(false);
    const { resolvedTheme , setTheme  } = (0,external_next_themes_.useTheme)();
    (0,external_react_.useEffect)(()=>setMounted(true), []);
    if (!mounted) return null;
    return /*#__PURE__*/ jsx_runtime_.jsx("button", {
        "aria-label": resolvedTheme === "dark" ? "Activate Light Mode" : "Activate Dark Mode",
        title: resolvedTheme === "dark" ? "Activate Light Mode" : "Activate Dark Mode",
        onClick: ()=>{
            setTheme(resolvedTheme === "dark" ? "light" : "dark");
        },
        className: styles,
        children: resolvedTheme === "dark" ? /*#__PURE__*/ jsx_runtime_.jsx("span", {
            className: "block w-4 h-4 bg-white rounded-full group-hover:-translate-y-1 transition-transform"
        }) : /*#__PURE__*/ jsx_runtime_.jsx("span", {
            className: "block w-4 h-4 bg-black rounded-full group-hover:-translate-y-1 transition-transform"
        })
    });
};
/* harmony default export */ const components_ThemeChanger = (ThemeChanger);

;// CONCATENATED MODULE: ./src/components/Logo.jsx


const Logo = ()=>{
    return /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
        href: "/",
        "aria-label": "Website logo, go back to homepage.",
        className: "flex items-center border-white group focus-visible:outline-accent",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "overflow-hidden transition ease-in-out rounded-full  hover:opacity-60",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                    className: "text-sm",
                    children: "cosmicjs"
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                    className: "text-sm text-accent",
                    children: ".com"
                })
            ]
        })
    });
};
/* harmony default export */ const components_Logo = (Logo);

;// CONCATENATED MODULE: ./src/components/Navbar.jsx








const Navbar = ()=>{
    const [navOpen, setNavOpen] = (0,external_react_.useState)(false);
    const currentPage = (0,router_.useRouter)();
    (0,external_react_.useEffect)(()=>{
        const body = document.body;
        if (navOpen) {
            body.style.setProperty("touch-action", "none");
        }
        if (!navOpen) {
            body.style.removeProperty("touch-action");
        }
    }, [
        navOpen
    ]);
    (0,external_react_.useEffect)(()=>{
        if (navOpen) {
            setNavOpen(!navOpen);
        }
    }, [
        currentPage
    ]);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("nav", {
        className: "fixed top-0 h-12 w-full md:hidden backdrop-filter backdrop-blur-sm bg-opacity-30 z-50",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("button", {
                className: "absolute top-3 right-2 z-50",
                "aria-label": !navOpen ? "Open Menu" : "Close Menu",
                onClick: ()=>{
                    setNavOpen(!navOpen);
                },
                children: !navOpen ? /*#__PURE__*/ jsx_runtime_.jsx(icons/* MenuIcon */.Oq, {}) : /*#__PURE__*/ jsx_runtime_.jsx(icons/* CloseIcon */.Tw, {})
            }),
            !navOpen ? /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "absolute top-3 left-2",
                children: /*#__PURE__*/ jsx_runtime_.jsx(components_Logo, {})
            }) : /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "flex flex-col z-40 h-screen w-full bg-back-primary overflow-hidden px-4 pt-16 mb-12",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("ul", {
                        className: "flex flex-col gap-y-12",
                        children: routes.map((route)=>/*#__PURE__*/ jsx_runtime_.jsx("li", {
                                className: "border-b border-b-slate-400 border-opacity-30 pb-2",
                                children: /*#__PURE__*/ jsx_runtime_.jsx((link_default()), {
                                    href: route.path,
                                    className: "text-fore-secondary",
                                    children: route.label
                                })
                            }, route.path))
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "flex justify-between mt-12",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(components_ThemeChanger, {})
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const components_Navbar = (Navbar);

;// CONCATENATED MODULE: ./src/components/Header.jsx





const Header = ()=>{
    return /*#__PURE__*/ jsx_runtime_.jsx(jsx_runtime_.Fragment, {
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("header", {
            className: "md:pt-4 container max-w-screen-lg m-auto md:px-12 lg:px-20",
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("nav", {
                    className: "hidden md:flex justify-start items-center h-full mt-auto space-x-6 text-sm lg:justify-start backdrop-filter backdrop-blur-sm  bg-opacity-30",
                    "aria-label": "Main Navigation",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx(components_Logo, {}),
                        /*#__PURE__*/ jsx_runtime_.jsx(components_MenuItems, {}),
                        /*#__PURE__*/ jsx_runtime_.jsx(components_ThemeChanger, {
                            styles: "hidden transition-transform ease-in-out focus:outline-none sm:block hover:text-accent group focus-visible:outline-accent"
                        })
                    ]
                }),
                /*#__PURE__*/ jsx_runtime_.jsx(components_Navbar, {})
            ]
        })
    });
};
/* harmony default export */ const components_Header = (Header);

// EXTERNAL MODULE: ./src/components/AlertPreview.jsx
var AlertPreview = __webpack_require__(3149);
;// CONCATENATED MODULE: ./src/components/Layout.jsx





const Layout = ({ children , preview  })=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(Meta/* Meta */.h_, {}),
            /*#__PURE__*/ jsx_runtime_.jsx(components_Header, {}),
            preview && /*#__PURE__*/ jsx_runtime_.jsx(AlertPreview/* default */.Z, {}),
            /*#__PURE__*/ jsx_runtime_.jsx("main", {
                className: "flex flex-col min-h-screen container flex-grow max-w-screen-lg px-5 m-auto mt-16 md:px-12 lg:px-20",
                children: children
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(components_Footer, {})
        ]
    });
};
/* harmony default export */ const components_Layout = (Layout);


/***/ }),

/***/ 8012:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SP": () => (/* binding */ PostMeta),
/* harmony export */   "Vj": () => (/* binding */ PageMeta),
/* harmony export */   "h_": () => (/* binding */ Meta)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(968);
/* harmony import */ var next_head__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_head__WEBPACK_IMPORTED_MODULE_1__);


const Meta = ()=>{
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_head__WEBPACK_IMPORTED_MODULE_1___default()), {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                rel: "apple-touch-icon",
                sizes: "180x180",
                href: "/favicon/apple-touch-icon.png"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                rel: "icon",
                type: "image/png",
                sizes: "32x32",
                href: "/favicon/favicon-32x32.png"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                rel: "icon",
                type: "image/png",
                sizes: "16x16",
                href: "/favicon/favicon-16x16.png"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                rel: "manifest",
                href: "/favicon/site.webmanifest"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                rel: "mask-icon",
                href: "/favicon/safari-pinned-tab.svg",
                color: "#000000"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                rel: "shortcut icon",
                href: "/favicon/favicon.ico"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                name: "msapplication-TileColor",
                content: "#000000"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                name: "msapplication-config",
                content: "/favicon/browserconfig.xml"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                name: "theme-color",
                content: "#000"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("link", {
                rel: "alternate",
                type: "application/rss+xml",
                href: "/feed.xml"
            })
        ]
    });
};
const PageMeta = ({ title , description  })=>{
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_head__WEBPACK_IMPORTED_MODULE_1___default()), {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("title", {
                children: title
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                name: "description",
                content: description
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                property: "og:title",
                content: title
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                property: "og:description",
                content: description
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                property: "og:image",
                content: "/images/Cosmic_OGImage.png"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                name: "twitter:card",
                content: "summary_large_image"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                name: "twitter:site",
                content: "@CosmicJS"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                name: "twitter:title",
                content: title
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                name: "twitter:description",
                content: description
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                name: "twitter:image",
                content: "https://cdn.cosmicjs.com/a0aa3180-a0a0-11e8-8dd8-9f9cde09837c-39b7c450-3d9b-11e8-9dd8-6123bc325337-COSMICJS.jpg"
            })
        ]
    });
};
const PostMeta = ({ title , description , slug , page , imageUrl  })=>{
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)((next_head__WEBPACK_IMPORTED_MODULE_1___default()), {
        children: [
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("title", {
                children: title
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                name: "description",
                content: description
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                property: "og:title",
                content: title
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                property: "og:url",
                content: `https://nextjs-developer-portfolio-cms.vercel.app/${page}/${slug}`
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                property: "og:type",
                content: "article"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                property: "og:image",
                content: imageUrl
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                property: "og:description",
                content: description
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                property: "og:image",
                content: imageUrl
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                name: "twitter:card",
                content: "summary_large_image"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                name: "twitter:site",
                content: "@CosmicJS"
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                name: "twitter:title",
                content: title
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                name: "twitter:description",
                content: description
            }),
            /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("meta", {
                name: "twitter:image",
                content: imageUrl
            })
        ]
    });
};


/***/ }),

/***/ 3287:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Bd": () => (/* binding */ getAllPosts),
/* harmony export */   "ds": () => (/* binding */ getPostAndMorePosts),
/* harmony export */   "h9": () => (/* binding */ getAllPostsWithSlug),
/* harmony export */   "it": () => (/* binding */ getPageBySlug),
/* harmony export */   "tG": () => (/* binding */ getAllCategories)
/* harmony export */ });
/* unused harmony export getPreviewPostBySlug */
const Cosmic = __webpack_require__(5422);
const api = Cosmic();
const BUCKET_SLUG = process.env.COSMIC_BUCKET_SLUG;
const READ_KEY = process.env.COSMIC_READ_KEY;
const bucket = api.bucket({
    slug: BUCKET_SLUG,
    read_key: READ_KEY
});
const is404 = (error)=>/not found/i.test(error.message);
async function getPreviewPostBySlug(slug) {
    try {
        const data = await bucket.objects.find({
            slug: slug
        }).props("slug").status("any");
        return data.objects[0];
    } catch (error) {
        if (is404(error)) return;
        throw error;
    }
}
async function getAllPosts(preview, postType, postCount) {
    try {
        const data = await bucket.objects.find({
            type: postType
        }).props("title,slug,metadata.category,metadata.excerpt,metadata.published_date,created_at,status").limit(postCount).sort("-created_at").status(preview ? "any" : "published");
        return data.objects;
    } catch (error) {
        if (is404(error)) return;
        throw error;
    }
}
async function getAllPostsWithSlug() {
    try {
        const data = await bucket.objects.find({
            type: "posts",
            props: "title,slug,metadata,created_at"
        });
        return data.objects;
    } catch (error) {
        if (is404(error)) return;
        throw error;
    }
}
async function getPostAndMorePosts(slug, preview) {
    try {
        const data = await bucket.objects.find({
            slug: slug
        }).props("slug,title,metadata,created_at").status(preview ? "any" : "published");
        const moreObjects = await bucket.objects.find({
            type: "posts"
        }).props("slug,title,metadata,created_at").status(preview ? "any" : "published");
        const morePosts = moreObjects.objects?.filter(({ slug: object_slug  })=>object_slug !== slug).slice(0, 2);
        return {
            post: data?.objects[0],
            morePosts
        };
    } catch (error) {
        if (is404(error)) return;
        throw error;
    }
}
async function getAllCategories(category) {
    try {
        const data = await bucket.objects.find({
            type: category
        }).props("title");
        return data.objects;
    } catch (error) {
        if (is404(error)) return;
        throw error;
    }
}
async function getPageBySlug(slug, props) {
    try {
        const data = await bucket.objects.find({
            type: slug
        }).props(props).depth(1);
        return data.objects[0];
    } catch (error) {
        if (is404(error)) return;
        throw error;
    }
}


/***/ })

};
;