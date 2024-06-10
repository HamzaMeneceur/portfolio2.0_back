import {Router} from 'express';
import adminController from '../controllers/adminController.js';
const router = Router();
router.get("/user", adminController.haveUser)
export default router;