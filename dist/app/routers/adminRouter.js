import { Router } from 'express';
import adminController from '../controllers/adminController.js';
const adminRouter = Router();
// router.get("/auth", limiter, adminController.authUser)
adminRouter.get("/user", adminController.haveUser);
adminRouter.get("/verify-email", adminController.verifyUser);
adminRouter.post("/signup", adminController.signup);
export default adminRouter;
