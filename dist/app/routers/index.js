import { Router } from 'express';
import adminRouter from './adminRouter.js';
import apiRouter from './apiRouter.js';
const router = Router();
router.use('/s', adminRouter);
router.use('/c', apiRouter);
export { adminRouter, apiRouter };
