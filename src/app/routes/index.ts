import express from 'express';
import { UserRoutes } from '../Modules/User/User.routes';
import { BlogRoutes } from '../Modules/Blog/Blog.routes';
import { AdminRoutes } from '../Modules/User/Admin.routes';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: UserRoutes,
  },
  {
    path: '/admin',
    route: AdminRoutes,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
