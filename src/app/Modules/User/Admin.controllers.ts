import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BlogServices } from '../Blog/Blog.services';
import { AdminServices } from './Admin.Services';

const blockedUser = catchAsync(async (req, res) => {
  const { userId } = req.params;

  const result = await AdminServices.blockedUserIntoDB(userId);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User blocked successfully',
    data: result,
  });
});
const deletedBlog = catchAsync(async (req, res) => {
  const { id } = req.params;

  await BlogServices.deleteSingleBlogIntoDB(id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Blog deleted successfully',
  });
});

export const AdminControllers = {
  blockedUser,
  deletedBlog,
};
