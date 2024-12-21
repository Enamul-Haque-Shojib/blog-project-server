"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminModel = void 0;
const mongoose_1 = require("mongoose");
const adminSchema = new mongoose_1.Schema({
    id: {
        type: String,
        unique: true,
        required: true,
    },
    auth: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: 'Auth',
    },
    name: {
        type: String,
        required: true,
    },
    email: { type: String, required: true, unique: true },
});
exports.AdminModel = (0, mongoose_1.model)('User', adminSchema);
