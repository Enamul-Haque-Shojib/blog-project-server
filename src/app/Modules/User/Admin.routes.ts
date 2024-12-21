
import express from 'express';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../User/User.constant';
import { AdminControllers } from './Admin.controllers';




const router = express.Router();


router.patch(
    '/users/:userId/block',
    auth(USER_ROLE.admin),
    AdminControllers.blockedUser
);
router.delete(
    '/blogs/:id',
    auth(USER_ROLE.admin),
    AdminControllers.deletedBlog
);





export const AdminRoutes = router;