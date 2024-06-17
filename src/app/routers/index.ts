import {Router} from 'express';
import adminRouter from './adminRouter.js';
import apiRouter from './apiRouter.js';
import errorHandler from '../services/error/errorHandler.js';
const router = Router()
router.use('/s', adminRouter);
router.use('/c', apiRouter);
router.use(errorHandler)
export default router