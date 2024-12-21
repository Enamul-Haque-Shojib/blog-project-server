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
exports.BlogServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const Blog_model_1 = require("./Blog.model");
const User_model_1 = require("../User/User.model");
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const createBlogIntoDB = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const email = user.userEmail;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        const user = yield User_model_1.UserModel.findOne({ email });
        if (!user) {
            throw new AppError_1.default(404, 'Invalid credentials', 'email');
        }
        payload.author = user === null || user === void 0 ? void 0 : user._id;
        const newBlog = yield Blog_model_1.BlogModel.create([payload], { session });
        if (!newBlog.length) {
            throw new AppError_1.default(400, 'Bad Request', 'user_not_created');
        }
        const populatedBlog = yield Blog_model_1.BlogModel.findById(newBlog[0]._id)
            .populate('author', 'name email')
            .session(session);
        if (!populatedBlog) {
            throw new AppError_1.default(404, 'Failed to retrieve created blog', 'populate_error');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return populatedBlog;
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error(error);
    }
});
const updateSingleBlogIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if ((yield Blog_model_1.BlogModel.isBlogExistsById(id)) == null) {
        throw new AppError_1.default(400, 'Blog do not exists', 'not_exists');
    }
    const result = yield Blog_model_1.BlogModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteSingleBlogIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if ((yield Blog_model_1.BlogModel.isBlogExistsById(id)) == null) {
        throw new AppError_1.default(400, 'Blog do not exists', 'not_exists');
    }
    const deletedBlog = yield Blog_model_1.BlogModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    if (!deletedBlog) {
        throw new AppError_1.default(400, 'Failed to delete blog 1', '');
    }
});
const getAllBlogsIntoDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const studentQuery = new QueryBuilder_1.default(Blog_model_1.BlogModel.find()
        .populate('author'), query)
        // .search(blogSearchableFields)
        // .filter()
        // .sortBy()
        .sortOrder();
    const result = yield studentQuery.modelQuery;
    return result;
});
exports.BlogServices = {
    createBlogIntoDB,
    getAllBlogsIntoDB,
    updateSingleBlogIntoDB,
    deleteSingleBlogIntoDB
};
