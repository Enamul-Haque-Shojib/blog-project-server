import { model, Schema } from "mongoose";
import { TUser, UserStaticModel } from "./User.interface";
import config from "../../config";
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser, UserStaticModel>({
  
    name:{
        type: String,
        required: true,
    },
    email: { 
        type: String,
         required: true,
          unique: true 
    },
    password:{
        type: String,
        required: true,
        select:0
    },
    role:{
        type: String,
        enum:{
            values: ["admin", "user"],
        },
    
        default: "user"
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    passwordChangedAt: {
      type: Date,
    },

},{
    timestamps: true,
  }
);



userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this; // doc
    // hashing password and save into DB
  
    user.password = await bcrypt.hash(
      user.password,
      Number(config.bcrypt_salt_rounds),
    );
  
    next();
  });

 
 userSchema.statics.isUserExistsById = async function (id: string){
  return await UserModel.findById(id);
 }
  userSchema.statics.isUserExistsByEmail = async function (email: string) {
    return await UserModel.findOne({ email }).select('+password');
  };

  userSchema.statics.isUserBlocked = async function (id: string) {
       const UserIsBlocked = await UserModel.findById(id);
       return UserIsBlocked?.isBlocked;
    };

  userSchema.statics.isPasswordMatched = async function (
    plainTextPassword,
    hashedPassword,
  ) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
  };
  
  userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ) {
    const passwordChangedTime =
      new Date(passwordChangedTimestamp).getTime() / 1000;
    return passwordChangedTime > jwtIssuedTimestamp;
  };
  


export const UserModel = model<TUser, UserStaticModel>('User', userSchema);