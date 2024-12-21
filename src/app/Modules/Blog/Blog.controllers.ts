
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BlogServices } from "./Blog.services";




const createBlog = catchAsync(async(req, res)=>{

    const user = req.user;
    const result = await BlogServices.createBlogIntoDB(req.body, user);

    console.log(result);
    const {_id, title, content, author} = result;
    

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Blog created successfully',
        
        data: {
            _id,
            title,
            content,
            author
        },
        
      });
});
const updateSingleBlog = catchAsync(async(req, res)=>{

    const {id} = req.params;

    const result = await BlogServices.updateSingleBlogIntoDB(id, req.body);

    

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Blogs updated successfully',
        data: result
        
      });
});
const deleteSingleBlog = catchAsync(async(req, res)=>{

    const {id} = req.params;

    await BlogServices.deleteSingleBlogIntoDB(id);

    

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Blog deleted successfully',
        
      });
});
const getAllBlogs = catchAsync(async(req, res)=>{

    
    const result = await BlogServices.getAllBlogsIntoDB(req.query);

    

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Blogs are retrieved successfully',
        data: result
        
      });
});



export const BlogControllers = {
    createBlog,
    getAllBlogs,
    updateSingleBlog,
    deleteSingleBlog
}