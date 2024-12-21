import config from "../../config";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./User.Services";



const registerUser = catchAsync(async(req, res)=>{

    const result = await UserServices.registerUserIntoDB(req.body);

    const {_id, name, email} = result;

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'User is registered successfully',
        data: {
            _id,
            name,
            email
        },
        
      });
});
const loginUser = catchAsync(async(req, res)=>{

    const result = await UserServices.loginUserIntoDB(req.body);

    const {refreshToken, accessToken} = result;

    res.cookie('refreshToken', refreshToken, {
        secure: config.NODE_ENV === 'production',
        httpOnly: true,
      });

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'login successfully',
        data: {
            token: accessToken
        }
      });
});


export const UserControllers = {
    registerUser,
    loginUser
}