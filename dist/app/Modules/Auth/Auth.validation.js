"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidationSchema = void 0;
const zod_1 = require("zod");
const loginValidationSchema = zod_1.z.object({
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
exports.AuthValidationSchema = {
    loginValidationSchema
};
