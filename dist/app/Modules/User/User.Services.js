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
exports.UserServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const User_model_1 = require("./User.model");
const config_1 = __importDefault(require("../../config"));
const User_utils_1 = require("./User.utils");
const registerUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const newUser = yield User_model_1.UserModel.create([payload], { session });
        console.log(newUser);
        if (!newUser.length) {
            throw new AppError_1.default(400, 'Bad Request', 'not_created');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return newUser[0];
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(error);
    }
});
const loginUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield User_model_1.UserModel.isUserExistsByEmail(payload.email);
    if (!user) {
        throw new AppError_1.default(404, 'Invalid credentials', 'email');
    }
    if (!(yield User_model_1.UserModel.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password)))
        throw new AppError_1.default(403, 'Invalid credentials', 'password');
    const userIsBlocked = user === null || user === void 0 ? void 0 : user.isBlocked;
    if (userIsBlocked == true) {
        throw new AppError_1.default(403, 'Forbidden', 'blocked');
    }
    const jwtPayloadData = {
        userEmail: user.email,
        role: user.role,
    };
    const accessToken = (0, User_utils_1.createToken)(jwtPayloadData, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const refreshToken = (0, User_utils_1.createToken)(jwtPayloadData, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
    return {
        role: user.role,
        accessToken,
        refreshToken,
    };
});
exports.UserServices = {
    registerUserIntoDB,
    loginUserIntoDB
};
