/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { USER_ROLE } from './User.constant';

export type TUser = {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  isBlocked: boolean;
  passwordChangedAt?: Date;
};

export interface UserStaticModel extends Model<TUser> {
  isUserExistsById(id: string): Promise<TUser>;
  isUserExistsByEmail(email: string): Promise<TUser>;
  isUserBlocked(email: string): Promise<boolean>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}

export type TUserRole = keyof typeof USER_ROLE;
