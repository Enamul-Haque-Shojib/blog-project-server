import { NextFunction, Request, Response } from 'express';

import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import AppError from '../errors/AppError';

import catchAsync from '../utils/catchAsync';
import { UserModel } from '../Modules/User/User.model';
import { TUserRole } from '../Modules/User/User.interface';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new AppError(
        401,
        'Header is missing',
        'Authorization header (token) is missing',
      );
    }

    if (!authHeader.startsWith('Bearer ')) {
      throw new AppError(
        401,
        'Invalid format',
        'Invalid authorization header format (format: Bearer <token>)',
      );
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new AppError(401, 'Unauthorized', 'User is not authorized');
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, userEmail, iat } = decoded;

    const user = await UserModel.isUserExistsByEmail(userEmail);

    if (!user) {
      throw new AppError(404, 'Invalid credentials', 'email does not exist');
    }

    const userIsBlocked = user?.isBlocked;

    if (userIsBlocked == true) {
      throw new AppError(403, 'Forbidden', 'User is already');
    }

    if (
      user.passwordChangedAt &&
      UserModel.isJWTIssuedBeforePasswordChanged(
        user.passwordChangedAt,
        iat as number,
      )
    ) {
      throw new AppError(401, 'Unauthorized', 'User is not authorized');
    }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(401, 'Unauthorized', 'User is not authorized');
    }

    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
