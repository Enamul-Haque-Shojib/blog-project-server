

import AppError from "../../errors/AppError";

import { UserModel } from "./User.model";




const blockedUserIntoDB = async(userId: string) => {

    if(await UserModel.isUserExistsById(userId) == null){
    
        throw new AppError(400, 'User do not exists','not_exists');
      }
    
        const blockedUser = await UserModel.findByIdAndUpdate(
           userId ,
          { isBlocked: true },
          { new: true },
        );
    
        
        if (!blockedUser) {
          throw new AppError(400, 'Failed to block user','');
        }
    
};






export const AdminServices = {
    blockedUserIntoDB,
    
}

