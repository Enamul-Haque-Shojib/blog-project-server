
import mongoose from "mongoose";
import { TUser } from "../User/User.interface";
import AppError from "../../errors/AppError";
import { UserModel } from "./User.model";
import config from "../../config";
import { createToken } from "./User.utils";



const registerUserIntoDB = async(payload: TUser) => {

    const session = await mongoose.startSession();
    try{
      
        session.startTransaction();
        const newUser = await UserModel.create([payload],{session});
        console.log(newUser)
        

        if (!newUser.length) {
            throw new AppError(400, 'Bad Request', 'not_created');
        }

        

        
        await session.commitTransaction();
        await session.endSession();

        return newUser[0];

    }catch(error: any){
        await session.abortTransaction();
        await session.endSession();
        throw new Error(error);
    }
    
};

const loginUserIntoDB = async(payload: TUser) => {

    const user = await UserModel.isUserExistsByEmail(payload.email);

  if (!user) {
    throw new AppError(404, 'Invalid credentials', 'email');
  }


  if (!(await UserModel.isPasswordMatched(payload?.password, user?.password)))
    throw new AppError(403, 'Invalid credentials', 'password');


  

  const userIsBlocked = user?.isBlocked;

  if (userIsBlocked == true) {
    throw new AppError(403, 'Forbidden', 'blocked');
  }





  const jwtPayloadData = {
    userEmail: user.email,
    role: user.role,
  };

  

  const accessToken = createToken(
    jwtPayloadData,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const refreshToken = createToken(
    jwtPayloadData,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string,
  );

  return {
    
    role: user.role,
    accessToken,
    refreshToken,
  };


};

export const UserServices = {
    registerUserIntoDB,
    loginUserIntoDB
}

