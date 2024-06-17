import {Router} from 'express';
import {limiter} from '../services/limiter.js';
import adminController from '../controllers/adminController.js';
const router = Router();
// router.get("/auth", limiter, adminController.authUser)
router.get("/user", adminController.haveUser);
router.get("/signup", adminController.signup);
export default router;