"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const Blog_validation_1 = require("./Blog.validation");
const Blog_controllers_1 = require("./Blog.controllers");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const User_constant_1 = require("../User/User.constant");
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(User_constant_1.USER_ROLE.admin, User_constant_1.USER_ROLE.user), (0, validateRequest_1.default)(Blog_validation_1.BlogValidationSchema.createBlogValidationSchema), Blog_controllers_1.BlogControllers.createBlog);
router.patch('/:id', (0, validateRequest_1.default)(Blog_validation_1.BlogValidationSchema.createBlogValidationSchema), Blog_controllers_1.BlogControllers.updateSingleBlog);
router.delete('/:id', Blog_controllers_1.BlogControllers.deleteSingleBlog);
router.get('/', Blog_controllers_1.BlogControllers.getAllBlogs);
exports.BlogRoutes = router;
