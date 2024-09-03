import {Router} from 'express';
import {limiter} from '../services/limiter.js';
import { verifyUser } from '../services/verifyUser.js';
import bodyProtect from '../services/bodyXss.js';
import adminController from '../controllers/adminController.js';
const adminRouter = Router();
// router.get("/auth", limiter, adminController.authUser)
adminRouter.get("/", adminController.renderSigninPage);
adminRouter.get("/project", adminController.renderProject)
adminRouter.post("/signin-post", bodyProtect, adminController.haveUser)
adminRouter.get("/signup", adminController.renderSignupPage);
adminRouter.post("/signup-post", bodyProtect, verifyUser, adminController.signup);
adminRouter.get("/privacypolicy", adminController.renderPrivacyPolicy);
adminRouter.get("/termsofuse", adminController.renderTermsOfUse)
export default adminRouter;