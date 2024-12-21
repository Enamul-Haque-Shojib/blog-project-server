"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middlewares/auth"));
const User_constant_1 = require("../User/User.constant");
const Admin_controllers_1 = require("./Admin.controllers");
const router = express_1.default.Router();
router.patch('/users/:userId/block', (0, auth_1.default)(User_constant_1.USER_ROLE.admin), Admin_controllers_1.AdminControllers.blockedUser);
router.delete('/blogs/:id', (0, auth_1.default)(User_constant_1.USER_ROLE.admin), Admin_controllers_1.AdminControllers.deletedBlog);
exports.AdminRoutes = router;
