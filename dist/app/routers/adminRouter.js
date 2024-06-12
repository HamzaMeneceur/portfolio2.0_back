import { Router } from 'express';
import adminController from '../controllers/adminController.js';
const router = Router();
// router.get("/auth", limiter, adminController.authUser)
router.get("/user", adminController.haveUser);
export default router;
