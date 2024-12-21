/* eslint-disable no-unused-vars */
import { Model, Types } from "mongoose";

export type TBlog = {
    title: string;
    content: string;
    author: Types.ObjectId;
    isPublished: boolean;
    isDeleted: boolean;
}


export interface BlogStaticModel extends Model<TBlog> {

    isBlogExistsById(id: string): Promise<TBlog>;
    
  }