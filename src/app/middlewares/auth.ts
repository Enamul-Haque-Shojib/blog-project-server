import { NextFunction, Request, Response } from 'express';

import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';


import catchAsync from '../utils/catchAsync';
import { UserModel } from '../Modules/User/User.model';
import { TUserRole } from '../Modules/User/User.interface';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;

    
    if (!token) {
      throw new AppError(401, 'Unauthorized', 'unauthorized');
    }

    
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, userEmail, iat } = decoded;

   
    

    
    const user = await UserModel.isUserExistsByEmail(userEmail);

    if (!user) {
      throw new AppError(404, 'Invalid credentials', 'email');
    }
    



    const userIsBlocked = user?.isBlocked;

    if (userIsBlocked == true) {
      throw new AppError(403, 'Forbidden', 'blocked');
    }

    if (
      user.passwordChangedAt &&
      UserModel.isJWTIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(401, 'Unauthorized' ,'unauthorized');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(401,'Unauthorized', 'unauthorized');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
