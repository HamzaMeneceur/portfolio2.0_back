import { Router } from 'express';
import { verifyUser } from '../services/verifyUser.js';
import bodyProtect from '../services/bodyXss.js';
import adminController from '../controllers/adminController.js';
const adminRouter = Router();
// router.get("/auth", limiter, adminController.authUser)
adminRouter.get("/", adminController.renderSigninPage);
adminRouter.post("/signin-post", bodyProtect, adminController.haveUser);
adminRouter.get("/signup", adminController.renderSignupPage);
adminRouter.post("/signup-post", bodyProtect, verifyUser, adminController.signup);
export default adminRouter;
