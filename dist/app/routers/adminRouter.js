import { Router } from 'express';
import { verifyUser } from '../services/verifyUser.js';
import bodyProtect from '../services/bodyXss.js';
import adminController from '../controllers/adminController.js';
import { isConnected } from '../services/security.js';
import { validate } from '../services/validation/validate.js';
import { adminSchema } from '../services/validation/schema.js';
const adminRouter = Router();
// router.get("/auth", limiter, adminController.authUser)
adminRouter.get("/", adminController.renderSigninPage);
adminRouter.get("/project", isConnected, adminController.renderProject);
adminRouter.post("/signin-post", validate(adminSchema), bodyProtect, adminController.authUser);
adminRouter.get("/signup", adminController.renderSignupPage);
adminRouter.post("/signup-post", bodyProtect, verifyUser, adminController.signup);
adminRouter.get("/privacypolicy", adminController.renderPrivacyPolicy);
adminRouter.get("/termsofuse", adminController.renderTermsOfUse);
export default adminRouter;
