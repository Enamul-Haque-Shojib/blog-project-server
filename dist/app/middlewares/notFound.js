"use strict";
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
Object.defineProperty(exports, "__esModule", { value: true });
// import httpStatus from 'http-status';
// const notFound = (req: Request, res: Response, next: NextFunction) => {
//   return res.status(httpStatus.NOT_FOUND).json({
//     success: false,
//     message: 'API Not Found !!',
//     error: '',
//   });
// };
const notFound = (req, res, next) => {
    res.status(404).json({
        success: false,
        message: 'API Not Found !!',
        error: '',
    });
};
exports.default = notFound;
