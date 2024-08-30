import {Router} from 'express';
import {limiter} from '../services/limiter.js';
import { verifyUser } from '../services/verifyUser.js';
import adminController from '../controllers/adminController.js';
const adminRouter = Router();
// router.get("/auth", limiter, adminController.authUser)
adminRouter.get("/", adminController.renderSigninPage);
adminRouter.get("/user", adminController.haveUser);
adminRouter.get("/signup", adminController.renderSignupPage)
adminRouter.post("/signup-post", verifyUser, adminController.signup);
export default adminRouter;