import { Router } from 'express';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import AvailableController from './app/controllers/AvailableController';
import MedicController from './app/controllers/MedicController';
const routes = new Router();

import authMiddlewares from './app/middlewares/auth'
import CepController from './app/controllers/CepController';

routes.post('/users',UserController.store);
routes.get('/users/:name',UserController.index);
routes.post('/sessions',SessionController.store);
routes.post('/cep/:cepNumber',CepController.find);

routes.use(authMiddlewares);

routes.put('/users', UserController.update);

routes.get('/medic/:medicId/available', AvailableController.index)

routes.get('/appointments', AppointmentController.index);
routes.get('/appointments/next', AppointmentController.next);
routes.post('/appointments', AppointmentController.store);
routes.delete('/appointments/:id', AppointmentController.delete);

routes.get('/schedule', ScheduleController.index);
routes.get('/schedule/all', ScheduleController.indexAll);

routes.get('/medics',MedicController.index);



export default routes;
