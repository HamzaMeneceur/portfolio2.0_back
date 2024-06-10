import {Router} from 'express';

import adminRouter from './adminRouter.js';

const router = Router()

router.use('/admin',adminRouter);
export default router;