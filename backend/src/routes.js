import { Router } from 'express';

import authMiddleware from '@/app/middlewares/auth';
import paginationMiddleware from '@/app/middlewares/pagination';

import SessionController from '@/app/controllers/SessionController';
import StudentController from '@/app/controllers/StudentController';
import PlanController from '@/app/controllers/PlanController';
import EnrollmentController from '@/app/controllers/EnrollmentController';
import CheckinController from '@/app/controllers/CheckinController';
import HelpOrderController from '@/app/controllers/HelpOrderController';
import StudentHelpOrderController from '@/app/controllers/StudentHelpOrderController';
import StudentVerifyController from '@/app/controllers/StudentVerifyController';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.get(
  '/students/:student_id/help-orders',
  StudentHelpOrderController.index
);
routes.post(
  '/students/:student_id/help-orders',
  StudentHelpOrderController.store
);

routes.get('/students/:student_id/checkins', CheckinController.index);
routes.post('/students/:student_id/checkins', CheckinController.store);

routes.get('/students/:student_id/verify', StudentVerifyController.show);

routes.use(authMiddleware);

routes.get('/students', paginationMiddleware, StudentController.index);
routes.get('/students/:student_id', StudentController.show);
routes.post('/students', StudentController.store);
routes.put('/students/:student_id', StudentController.update);
routes.delete('/students/:student_id', StudentController.delete);

routes.get('/plans', paginationMiddleware, PlanController.index);
routes.get('/plans/:plan_id', PlanController.show);
routes.post('/plans', PlanController.store);
routes.put('/plans/:plan_id', PlanController.update);
routes.delete('/plans/:plan_id', PlanController.destroy);

routes.get('/enrollments', paginationMiddleware, EnrollmentController.index);
routes.get('/enrollments/:enrollment_id', EnrollmentController.show);
routes.post('/enrollments', EnrollmentController.store);
routes.put('/enrollments/:enrollment_id', EnrollmentController.update);
routes.delete('/enrollments/:enrollment_id', EnrollmentController.destroy);

routes.get('/help-orders', HelpOrderController.index);
routes.put('/help-orders/:help_order_id', HelpOrderController.update);

export default routes;
