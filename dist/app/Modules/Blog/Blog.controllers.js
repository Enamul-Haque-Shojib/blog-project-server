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
exports.BlogControllers = void 0;
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const Blog_services_1 = require("./Blog.services");
const createBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = req.user;
    const result = yield Blog_services_1.BlogServices.createBlogIntoDB(req.body, user);
    console.log(result);
    const { _id, title, content, author } = result;
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Blog created successfully',
        data: {
            _id,
            title,
            content,
            author
        },
    });
}));
const updateSingleBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield Blog_services_1.BlogServices.updateSingleBlogIntoDB(id, req.body);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Blogs updated successfully',
        data: result
    });
}));
const deleteSingleBlog = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield Blog_services_1.BlogServices.deleteSingleBlogIntoDB(id);
    (0, sendResponse_1.default)(res, {
        statusCode: 200,
        success: true,
        message: 'Blog deleted successfully',
    });
}));
const getAllBlogs = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield Blog_services_1.BlogServices.getAllBlogsIntoDB(req.query);
    (0, sendResponse_1.default)(res, {
        statusCode: 201,
        success: true,
        message: 'Blogs are retrieved successfully',
        data: result
    });
}));
exports.BlogControllers = {
    createBlog,
    getAllBlogs,
    updateSingleBlog,
    deleteSingleBlog
};
