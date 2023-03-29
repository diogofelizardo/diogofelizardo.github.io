"use strict";
(() => {
var exports = {};
exports.id = 405;
exports.ids = [405,197];
exports.modules = {

/***/ 5726:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ pages),
  "getStaticProps": () => (/* binding */ getStaticProps)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: ./src/lib/cosmic.js
var cosmic = __webpack_require__(3287);
// EXTERNAL MODULE: ./src/components/Socials.jsx
var Socials = __webpack_require__(579);
// EXTERNAL MODULE: ./node_modules/next/legacy/image.js
var legacy_image = __webpack_require__(9755);
var image_default = /*#__PURE__*/__webpack_require__.n(legacy_image);
// EXTERNAL MODULE: ./public/images/b4d5e297-fec9-42a9-a023-6b1b98fc7873.png
var b4d5e297_fec9_42a9_a023_6b1b98fc7873 = __webpack_require__(9965);
;// CONCATENATED MODULE: ./src/sections/IntroSection.jsx




const IntroSection = ({ heading , subHeading , socials  })=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("section", {
        className: "w-full flex flex-col-reverse md:flex-row justify-start",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "flex-1 flex flex-col gap-y-4",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("h1", {
                        className: "text-3xl md:text-5xl font-bold max-w-2xl text-fore-primary",
                        children: heading || "Developer Portfolio"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                        className: "mb-4 max-w-lg",
                        children: subHeading || "This portfolio template is powered by Cosmic."
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(Socials/* default */.Z, {
                        resume: socials?.metadata.resume.url,
                        email: socials?.metadata.email,
                        github: socials?.metadata.github,
                        linkedin: socials?.metadata.linkedin
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "w-[80px] sm:w-[186px] relative mb-6 sm:mb-0 rounded-full",
                children: /*#__PURE__*/ jsx_runtime_.jsx((image_default()), {
                    src: b4d5e297_fec9_42a9_a023_6b1b98fc7873/* default */.Z,
                    alt: "Diogo Felizardo",
                    height: 186,
                    width: 186,
                    quality: 60,
                    className: "rounded-full",
                    placeholder: "blur"
                })
            })
        ]
    });
};
/* harmony default export */ const sections_IntroSection = (IntroSection);

// EXTERNAL MODULE: ./node_modules/next/link.js
var next_link = __webpack_require__(1664);
var link_default = /*#__PURE__*/__webpack_require__.n(next_link);
// EXTERNAL MODULE: ./src/configs/icons.jsx
var icons = __webpack_require__(3612);
// EXTERNAL MODULE: external "isomorphic-dompurify"
var external_isomorphic_dompurify_ = __webpack_require__(3059);
;// CONCATENATED MODULE: ./src/sections/AboutMeSection.jsx




const AboutMeSection = ({ bodyText  })=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("section", {
        className: "mt-24",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                className: "text-2xl md:text-3xl mb-8 text-fore-primary border-b border-b-slate-200 dark:border-b-gray-600 w-fit",
                children: "About Me"
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "text-fore-primary mb-8 space-y-4",
                dangerouslySetInnerHTML: {
                    __html: (0,external_isomorphic_dompurify_.sanitize)(bodyText)
                }
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)((link_default()), {
                href: "/about",
                className: "flex items-center text-accent underline underline-offset-2 cursor-pointer hover:opacity-70 transition hover:translate-x-1 w-fit",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                        className: "mr-1",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(icons/* ForwardArrowIcon */.RC, {})
                    }),
                    "Learn more"
                ]
            })
        ]
    });
};
/* harmony default export */ const sections_AboutMeSection = (AboutMeSection);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
;// CONCATENATED MODULE: ./src/components/DevIcon.jsx

const DevIcon = ({ iconName , name  })=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("li", {
        className: "flex items-center",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("i", {
                className: iconName
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                className: "ml-2",
                children: name
            })
        ]
    }, name);
};
/* harmony default export */ const components_DevIcon = (DevIcon);

;// CONCATENATED MODULE: ./src/configs/dev-icons.js
const devIcons = [
    {
        iconName: "devicon-html5-plain",
        name: "HTML"
    },
    {
        iconName: "devicon-css3-plain",
        name: "CSS"
    },
    {
        iconName: "devicon-javascript-plain",
        name: "JavaScript"
    },
    {
        iconName: "devicon-typescript-original",
        name: "TypeScript"
    },
    {
        iconName: "devicon-nodejs-plain",
        name: "Node.js"
    },
    {
        iconName: "devicon-nestjs-plain",
        name: "Nest.js"
    },
    {
        iconName: "devicon-vuejs-plain",
        name: "Vue.js"
    },
    {
        iconName: "devicon-react-original",
        name: "React.js"
    },
    {
        iconName: "devicon-npm-original-wordmark",
        name: "NPM"
    },
    {
        iconName: "devicon-git-plain",
        name: "Git"
    },
    {
        iconName: "devicon-firebase-plain",
        name: "Firebase"
    },
    {
        iconName: "devicon-mongodb-plain",
        name: "MongoDB"
    },
    {
        iconName: "devicon-docker-plain",
        name: "Docker"
    },
    {
        iconName: "devicon-mysql-plain",
        name: "Mysql"
    },
    {
        iconName: "devicon-bootstrap-plain",
        name: "Bootstrap"
    },
    {
        iconName: "devicon-jest-plain",
        name: "Jest"
    }
];

;// CONCATENATED MODULE: ./src/sections/ToolboxSection.jsx





const TechSection = ()=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("section", {
        className: "py-24",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                className: "flex items-center mb-8",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "bg-back-subtle p-2 mr-4 rounded-full",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(icons/* ToolboxIcon */.Yp, {})
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                        className: "text-xl text-accent font-semibold",
                        children: "Toolbox"
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("ul", {
                className: "grid grid-cols-2 sm:grid-cols-4 gap-6",
                children: devIcons.map((icon)=>/*#__PURE__*/ jsx_runtime_.jsx(components_DevIcon, {
                        name: icon.name,
                        iconName: icon.iconName
                    }, icon.name))
            })
        ]
    });
};
/* harmony default export */ const ToolboxSection = (TechSection);

// EXTERNAL MODULE: ./src/components/PostList.jsx
var PostList = __webpack_require__(9007);
;// CONCATENATED MODULE: ./src/sections/WorksSection.jsx




const WorksSection = ({ posts  })=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("section", {
        className: "mt-24",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                className: "flex items-center mb-8",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "bg-back-subtle p-2 mr-4 rounded-full",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(icons/* FlaskIcon */.Vz, {})
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                        className: "text-xl text-accent font-semibold",
                        children: "Works"
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(PostList/* default */.Z, {
                allPosts: posts,
                postType: "works",
                home: true
            })
        ]
    });
};
/* harmony default export */ const sections_WorksSection = (WorksSection);

;// CONCATENATED MODULE: ./src/sections/PostsSection.jsx



const PostsSection_WorksSection = ({ posts  })=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("section", {
        className: "mt-24",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("span", {
                className: "flex items-center mb-8",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "bg-back-subtle p-2 mr-4 rounded-full",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(icons/* PencilIcon */.vd, {})
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                        className: "text-xl text-accent font-semibold",
                        children: "Posts"
                    })
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(PostList/* default */.Z, {
                allPosts: posts,
                postType: "posts",
                home: true
            })
        ]
    });
};
/* harmony default export */ const PostsSection = (PostsSection_WorksSection);

;// CONCATENATED MODULE: ./src/sections/ContactSection.jsx



const ContactSection = ({ heading , bodyText , email  })=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("section", {
        className: "group h-72 flex flex-col items-center justify-center my-32",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h3", {
                className: "text-3xl flex items-center gap-x-2 font-bold",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                        className: "bg-back-subtle p-1 rounded-full",
                        children: /*#__PURE__*/ jsx_runtime_.jsx(icons/* LetterIcon */.gv, {})
                    }),
                    heading
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "text-fore-subtle my-3 text-center space-y-4",
                dangerouslySetInnerHTML: {
                    __html: (0,external_isomorphic_dompurify_.sanitize)(bodyText)
                }
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("a", {
                href: `mailto:${email}`,
                className: "text-white px-16 py-3.5 mt-8 text-xl bg-gradient-to-r from-accent to-violet-400 rounded hover:from-pink-500 hover:to-yellow-500",
                children: "Say hello"
            })
        ]
    });
};
/* harmony default export */ const sections_ContactSection = (ContactSection);

// EXTERNAL MODULE: ./src/components/Meta.jsx
var Meta = __webpack_require__(8012);
// EXTERNAL MODULE: ./src/components/Layout.jsx + 6 modules
var Layout = __webpack_require__(8157);
;// CONCATENATED MODULE: ./src/pages/index.jsx










const Index = ({ allPosts , allWorks , pageData , preview  })=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(jsx_runtime_.Fragment, {
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx(Meta/* PageMeta */.Vj, {
                title: pageData.metadata.meta_title,
                description: pageData.metadata.meta_title
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Layout/* default */.Z, {
                preview: preview,
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx(sections_IntroSection, {
                        heading: pageData.metadata.heading,
                        subHeading: pageData.metadata.sub_heading,
                        socials: pageData.metadata.socials
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(sections_AboutMeSection, {
                        bodyText: pageData.metadata.about
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(ToolboxSection, {}),
                    /*#__PURE__*/ jsx_runtime_.jsx(sections_WorksSection, {
                        posts: allWorks
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(PostsSection, {
                        posts: allPosts
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx(sections_ContactSection, {
                        heading: pageData.metadata.contact_heading,
                        bodyText: pageData.metadata.contact_text,
                        email: pageData.metadata.socials.metadata.email
                    })
                ]
            })
        ]
    });
};
// Below, we are calling the function in our cosmic.js file, and getting the posts from our Cosmic bucket. Since we are fetching from a single function in our cosmic.js file, we state whether we are viewing a preview of our page, what kind of posts we want (since we have blog posts and works posts), and the amount of posts we want to grab. In this case on the home page, I specified a limit of 3 posts.
async function getStaticProps({ preview =null  }) {
    const allPosts = await (0,cosmic/* getAllPosts */.Bd)(preview, "posts", 3) || [];
    const allWorks = await (0,cosmic/* getAllPosts */.Bd)(preview, "works", 3) || [];
    const pageData = await (0,cosmic/* getPageBySlug */.it)("home-page", "metadata.heading,metadata.sub_heading,metadata.socials,metadata.meta_title,metadata.meta_description,metadata.about,metadata.contact_heading,metadata.contact_text");
    return {
        props: {
            allPosts,
            allWorks,
            pageData,
            preview
        },
        revalidate: 60
    };
}
/* harmony default export */ const pages = (Index);


/***/ }),

/***/ 5422:
/***/ ((module) => {

module.exports = require("cosmicjs");

/***/ }),

/***/ 4146:
/***/ ((module) => {

module.exports = require("date-fns");

/***/ }),

/***/ 3059:
/***/ ((module) => {

module.exports = require("isomorphic-dompurify");

/***/ }),

/***/ 1162:
/***/ ((module) => {

module.exports = require("next-themes");

/***/ }),

/***/ 3918:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/amp-context.js");

/***/ }),

/***/ 5732:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/amp-mode.js");

/***/ }),

/***/ 3280:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/app-router-context.js");

/***/ }),

/***/ 2796:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/head-manager-context.js");

/***/ }),

/***/ 744:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config-context.js");

/***/ }),

/***/ 5843:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/image-config.js");

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

/***/ 2470:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/side-effect.js");

/***/ }),

/***/ 9232:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils.js");

/***/ }),

/***/ 618:
/***/ ((module) => {

module.exports = require("next/dist/shared/lib/utils/warn-once.js");

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
var __webpack_exports__ = __webpack_require__.X(0, [664,636,755,612,827,7,318], () => (__webpack_exec__(5726)));
module.exports = __webpack_exports__;

})();