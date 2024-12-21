"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidationSchema = void 0;
const zod_1 = require("zod");
const createAdminValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({ message: "Name is required" })
            .trim(),
        email: zod_1.z
            .string()
            .email({ message: 'Invalid email' }),
        password: zod_1.z
            .string({ invalid_type_error: "Invalid Password" }),
        role: zod_1.z
            .enum(['admin', 'user'], { message: "Invalid role" })
    })
});
exports.AdminValidationSchema = {
    createAdminValidationSchema,
};
