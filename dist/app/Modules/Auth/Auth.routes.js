"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const Auth_Controllers_1 = require("./Auth.Controllers");
const User_validation_1 = require("../User/User.validation");
const Auth_validation_1 = require("./Auth.validation");
const router = express_1.default.Router();
router.post('/register', (0, validateRequest_1.default)(User_validation_1.UserValidationSchema.registerUserValidationSchema), Auth_Controllers_1.AuthControllers.registerUser);
router.post('/login', (0, validateRequest_1.default)(Auth_validation_1.AuthValidationSchema.loginValidationSchema), Auth_Controllers_1.AuthControllers.loginUser);
exports.AuthRoutes = router;
