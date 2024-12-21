
import mongoose from "mongoose";

import AppError from "../../errors/AppError";
import { TBlog } from "./Blog.interface";
import { BlogModel } from "./Blog.model";
import { JwtPayload } from "jsonwebtoken";
import { UserModel } from "../User/User.model";
import QueryBuilder from "../../builder/QueryBuilder";
import { blogSearchableFields } from "./Blog.constant";




const createBlogIntoDB = async(payload: TBlog, user: JwtPayload) => {

    
    const email = user.userEmail;
    
    const session = await mongoose.startSession();
    try{
      
        session.startTransaction();

        const user = await UserModel.findOne({email});

        if (!user) {
          throw new AppError(404, 'You are Unauthorized',`You are not authorized by your ${email}`);
        }

        payload.author = user?._id;

        const newBlog = await BlogModel.create([payload],{session});

        if (!newBlog.length) {
            throw new AppError(400, 'Bad Request', 'Blog could not be created');
        }

        const populatedBlog = await BlogModel.findById(newBlog[0]._id)
        .populate('author', 'name email') 
        .session(session);

        if (!populatedBlog) {
            throw new AppError(404, 'populate_error of author', 'Failed to retrieve created blog');
        }

        await session.commitTransaction();
        await session.endSession();

        return populatedBlog;
    

    }catch(error: any){
        await session.abortTransaction();
        await session.endSession();
        throw new Error(error);
    }
    
};
const updateSingleBlogIntoDB = async(id: string, payload: Partial<TBlog>) => {

    if(await BlogModel.isBlogExistsById(id) == null){
    
      throw new AppError(400, 'Does not exists',`Blog does not exist this ${id}`);
    }
    if(await BlogModel.isBlogDeleted(id)){
    
      throw new AppError(400, 'Blog is already Deleted',`Blog does not exists this ${id} because it is already deleted`);
    }

    const result = await BlogModel.findByIdAndUpdate( id , payload, {
        new: true,
        runValidators: true,
      });
    return result;
    
};
const deleteSingleBlogIntoDB = async(id: string) => {

  
    if(await BlogModel.isBlogExistsById(id) == null){
    
        throw new AppError(400, 'Does not exists',`Blog does not exist this ${id}`);
    }

    if(await BlogModel.isBlogDeleted(id)){
    
      throw new AppError(400, 'Blog is already Deleted',`Blog does not exists this ${id} because it is already deleted`);
  }
    
        const deletedBlog = await BlogModel.findByIdAndUpdate(
           id ,
          { isDeleted: true },
          { new: true },
        );
    
        
        if (!deletedBlog) {
          throw new AppError(400, 'Failed to delete','Blog could not be deleted');
        }
    
       
    
};
const getAllBlogsIntoDB = async(query: Record<string, unknown>) => {


    const studentQuery = new QueryBuilder(
        BlogModel.find()
          .populate('author'),
        query,
      )
        .search(blogSearchableFields)
        .filter()
        .sortBy()
        .sortOrder()
        
      const result = await studentQuery.modelQuery;
      return result;
  
    
};




export const BlogServices = {
    createBlogIntoDB,
    getAllBlogsIntoDB,
    updateSingleBlogIntoDB,
    deleteSingleBlogIntoDB
}

