import { Router } from 'express';

import authMiddleware from '@/app/middlewares/auth';

import SessionController from '@/app/controllers/SessionController';
import StudentController from '@/app/controllers/StudentController';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);
routes.get('/students', StudentController.index);
routes.post('/students', StudentController.store);
routes.put('/students/:student_id', StudentController.update);

export default routes;
