import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidationSchema } from './User.validation';
import { UserControllers } from './User.Controllers';

const router = express.Router();

router.post(
  '/register',
  validateRequest(UserValidationSchema.registerUserValidationSchema),
  UserControllers.registerUser,
);
router.post(
  '/login',
  validateRequest(UserValidationSchema.loginUserValidationSchema),
  UserControllers.loginUser,
);

export const UserRoutes = router;
