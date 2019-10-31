import { Router } from 'express';

import authMiddleware from '@/app/middlewares/auth';

import SessionController from '@/app/controllers/SessionController';
import StudentController from '@/app/controllers/StudentController';
import PlanController from '@/app/controllers/PlanController';
import EnrollmentController from '@/app/controllers/EnrollmentController';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.get('/students', StudentController.index);
routes.post('/students', StudentController.store);
routes.put('/students/:student_id', StudentController.update);

routes.get('/plans', PlanController.index);
routes.post('/plans', PlanController.store);
routes.put('/plans/:plan_id', PlanController.update);
routes.delete('/plans/:plan_id', PlanController.destroy);

routes.get('/enrollments', EnrollmentController.index);
routes.post('/enrollments', EnrollmentController.store);
routes.put('/enrollments/:enrollment_id', EnrollmentController.update);
routes.delete('/enrollments/:enrollment_id', EnrollmentController.destroy);

export default routes;
