"use strict";
(() => {
var exports = {};
exports.id = 157;
exports.ids = [157];
exports.modules = {

/***/ 5422:
/***/ ((module) => {

module.exports = require("cosmicjs");

/***/ }),

/***/ 2528:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ preview)
});

;// CONCATENATED MODULE: ./src/lib/cosmic.js
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

;// CONCATENATED MODULE: ./src/pages/api/preview.js

async function preview(req, res) {
    // Check the secret and next parameters
    // This secret should only be known to this API route and the CMS
    if (req.query.secret !== process.env.COSMIC_PREVIEW_SECRET || !req.query.slug) {
        return res.status(401).json({
            message: "Invalid token"
        });
    }
    // Fetch the headless CMS to check if the provided `slug` exists
    const post = await getPreviewPostBySlug(req.query.slug);
    // If the slug doesn't exist prevent preview mode from being enabled
    if (!post) {
        return res.status(401).json({
            message: "Invalid slug"
        });
    }
    // Enable Preview Mode by setting the cookies
    res.setPreviewData({});
    // Redirect to the path from the fetched post
    // We don't redirect to req.query.slug as that might lead to open redirect vulnerabilities
    res.writeHead(307, {
        Location: `/posts/${post.slug}`
    });
    res.end();
}


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(2528));
module.exports = __webpack_exports__;

})();