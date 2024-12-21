"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidationSchema = void 0;
const zod_1 = require("zod");
const createBlogValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({ message: "title is required" }),
        content: zod_1.z.string({ message: "content is required" }),
    })
});
exports.BlogValidationSchema = {
    createBlogValidationSchema,
};
