"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const User_validation_1 = require("./User.validation");
const User_Controllers_1 = require("./User.Controllers");
const router = express_1.default.Router();
router.post('/register', (0, validateRequest_1.default)(User_validation_1.UserValidationSchema.registerUserValidationSchema), User_Controllers_1.UserControllers.registerUser);
router.post('/login', (0, validateRequest_1.default)(User_validation_1.UserValidationSchema.loginUserValidationSchema), User_Controllers_1.UserControllers.loginUser);
exports.UserRoutes = router;
