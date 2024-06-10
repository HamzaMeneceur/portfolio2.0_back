import { Router } from 'express';
import adminController from '../controllers/adminController.js';
const router = Router();
console.log('2');
router.get("/user", adminController.haveUser);
export default router;
