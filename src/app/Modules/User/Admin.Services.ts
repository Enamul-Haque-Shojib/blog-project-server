

import AppError from "../../errors/AppError";

import { UserModel } from "./User.model";




const blockedUserIntoDB = async(userId: string) => {

    if(await UserModel.isUserExistsById(userId) == null){
    
        throw new AppError(400, 'does not exists',`User does not exists this ${userId}`);
      }
    if(await UserModel.isUserBlocked(userId)){
    
        throw new AppError(400, 'Blocked User',`User is already blocked`);
      }
    
        const blockedUser = await UserModel.findByIdAndUpdate(
           userId ,
          { isBlocked: true },
          { new: true },
        );
    
        
        if (!blockedUser) {
          throw new AppError(400, 'Block failed','User could not be blocked');
        }
    
};






export const AdminServices = {
    blockedUserIntoDB,
    
}

