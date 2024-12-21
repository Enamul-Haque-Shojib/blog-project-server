"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidationSchema = void 0;
const zod_1 = require("zod");
const registerUserValidationSchema = zod_1.z.object({
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
            .optional()
            .default('user')
    })
});
const loginUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        email: zod_1.z
            .string({
            invalid_type_error: "invalid email"
        }),
        password: zod_1.z
            .string({
            invalid_type_error: 'Password Invalid'
        })
    })
});
exports.UserValidationSchema = {
    registerUserValidationSchema,
    loginUserValidationSchema
};
