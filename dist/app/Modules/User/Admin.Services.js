"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminServices = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const User_model_1 = require("./User.model");
const blockedUserIntoDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    if ((yield User_model_1.UserModel.isUserExistsById(userId)) == null) {
        throw new AppError_1.default(400, 'User do not exists', 'not_exists');
    }
    const blockedUser = yield User_model_1.UserModel.findByIdAndUpdate(userId, { isBlocked: true }, { new: true });
    if (!blockedUser) {
        throw new AppError_1.default(400, 'Failed to block user', '');
    }
});
exports.AdminServices = {
    blockedUserIntoDB,
};
