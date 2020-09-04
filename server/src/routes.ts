import express from 'express';
import ClassesController from './controllers/ClassesController';
import ConnectionsController from './controllers/ConnectionsController';

const routes = express.Router();

const classesController = new ClassesController;
const connectionsController = new ConnectionsController;

//HTTP methods: get, post, put, delete.
//Request params: body(req.body), route(req.params), query(req.query).  

routes.post('/classes', classesController.create);
routes.get('/classes', classesController.index);
routes.post('/connections', connectionsController.create);
routes.get('/connections', connectionsController.index);

export default routes;