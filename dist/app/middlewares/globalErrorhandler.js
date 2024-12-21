"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const handleZodError_1 = __importDefault(require("../errors/handleZodError"));
// import handleValidationError from "../errors/handleValidationError";
// import handleCastError from "../errors/handleCastError";
const handleDuplicateError_1 = __importDefault(require("../errors/handleDuplicateError"));
const AppError_1 = __importDefault(require("../errors/AppError"));
const config_1 = __importDefault(require("../config"));
const globalErrorHandler = (err, req, res, next) => {
    //setting default values
    let statusCode = 500;
    let message = 'Something went wrong!';
    let error = [
        {
            path: '',
            message: 'Something went wrong',
        },
    ];
    if (err instanceof zod_1.ZodError) {
        const simplifiedError = (0, handleZodError_1.default)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        error = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSources;
    }
    //  else if (err?.name === 'ValidationError') {
    //   const simplifiedError = handleValidationError(err);
    //   statusCode = simplifiedError?.statusCode;
    //   message = simplifiedError?.message;
    //   error = simplifiedError?.errorSources;
    // }
    //  else if (err?.name === 'CastError') {
    //   const simplifiedError = handleCastError(err);
    //   statusCode = simplifiedError?.statusCode;
    //   message = simplifiedError?.message;
    //   error = simplifiedError?.errorSources;
    // } 
    else if ((err === null || err === void 0 ? void 0 : err.code) === 11000) {
        const simplifiedError = (0, handleDuplicateError_1.default)(err);
        statusCode = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.statusCode;
        message = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.message;
        error = simplifiedError === null || simplifiedError === void 0 ? void 0 : simplifiedError.errorSources;
    }
    else if (err instanceof AppError_1.default) {
        statusCode = err === null || err === void 0 ? void 0 : err.statusCode;
        message = err.message;
        if (err.status === 'email') {
            error = [
                {
                    path: '',
                    message: 'Email is not correct, Please try again',
                },
            ];
        }
        else if (err.status === 'password') {
            error = [
                {
                    path: '',
                    message: 'Password is not correct, Please try again',
                },
            ];
        }
        else if (err.status === 'blocked') {
            error = [
                {
                    path: '',
                    message: 'User is blocked',
                },
            ];
        }
        else if (err.status === 'user_not_created') {
            error = [
                {
                    path: '',
                    message: 'User is not created, Please try again',
                },
            ];
        }
        else if (err.status === 'unauthorized') {
            error = [
                {
                    path: '',
                    message: 'User is Unauthorized',
                },
            ];
        }
    }
    else if (err instanceof Error) {
        message = err.message;
        error = [
            {
                path: '-------------->>>>>>>>>>>',
                message: err === null || err === void 0 ? void 0 : err.message,
            },
        ];
    }
    res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        error,
        err,
        stack: config_1.default.NODE_ENV === 'development' ? err === null || err === void 0 ? void 0 : err.stack : null,
    });
    return next();
};
exports.default = globalErrorHandler;
//pattern
/*
success
message
errorSources:[
  path:'',
  message:''
]
stack
*/
