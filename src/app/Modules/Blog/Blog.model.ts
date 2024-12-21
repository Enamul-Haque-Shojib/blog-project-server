import { model, Schema } from "mongoose";
import { BlogStaticModel, TBlog } from "./Blog.interface";


const blogSchema = new Schema<TBlog, BlogStaticModel>({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    content:{
        type:String,
        required: true,
    },
    author:{
        type: Schema.Types.ObjectId,
        required: true,
        ref:'User'
    },
    isPublished: {
        type:Boolean,
        default: true,
    },
    isDeleted: {
        type:Boolean,
        default: false,
    }
},{
    timestamps: true,
  });

blogSchema.pre('find' , function(next){
    this.find({isDeleted: {$ne: true}})
    next();
  })


  blogSchema.statics.isBlogExistsById = async function (id: string) {
     return await BlogModel.findById(id);
   };
  blogSchema.statics.isBlogDeleted = async function (id: string) {
     const BlogIsDeleted = await BlogModel.findById(id);
     return BlogIsDeleted?.isDeleted;
   };

export const BlogModel = model<TBlog, BlogStaticModel>('Blog', blogSchema);