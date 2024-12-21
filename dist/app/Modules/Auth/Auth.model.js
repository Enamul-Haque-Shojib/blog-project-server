"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModel = void 0;
const mongoose_1 = require("mongoose");
const authSchema = new mongoose_1.Schema({
    id: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: {
            values: ["admin", "user"],
        },
        default: "user"
    },
    isBlocked: {
        type: Boolean,
        default: false,
    }
});
exports.AuthModel = (0, mongoose_1.model)('Auth', authSchema);
