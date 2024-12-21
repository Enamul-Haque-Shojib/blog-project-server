"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const User_routes_1 = require("../Modules/User/User.routes");
const Blog_routes_1 = require("../Modules/Blog/Blog.routes");
const Admin_routes_1 = require("../Modules/User/Admin.routes");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: '/auth',
        route: User_routes_1.UserRoutes
    },
    {
        path: '/admin',
        route: Admin_routes_1.AdminRoutes
    },
    {
        path: '/blogs',
        route: Blog_routes_1.BlogRoutes
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
