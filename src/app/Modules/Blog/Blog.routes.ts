
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BlogValidationSchema } from './Blog.validation';
import { BlogControllers } from './Blog.controllers';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/User.constant';




const router = express.Router();

router.post(
    '/',
    auth(USER_ROLE.admin, USER_ROLE.user),
    validateRequest(BlogValidationSchema.createBlogValidationSchema),
    BlogControllers.createBlog
);
router.patch(
    '/:id',
    validateRequest(BlogValidationSchema.createBlogValidationSchema),
    BlogControllers.updateSingleBlog
);
router.delete(
    '/:id',
    BlogControllers.deleteSingleBlog
);
router.get(
    '/',
    BlogControllers.getAllBlogs
);




export const BlogRoutes = router;