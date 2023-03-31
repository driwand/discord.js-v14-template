import { Router } from 'express';
import { checkClient } from '../middlewares';
import { newExample } from './example.controller';

const exampleRouter = Router();

exampleRouter.get('/test', checkClient, newExample);

export default exampleRouter;
