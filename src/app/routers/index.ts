import {Router} from 'express';
import {limiter} from '../services/limiter.js';
import adminRouter from './adminRouter.js';

const router = Router()

router.use('/admin', adminRouter);
export default router;