import {AuthRouter} from "./AuthRouter.js";
import authController from "../../controllers/auth/indexAuthController.js";

const authRouter = new AuthRouter(authController)

export default authRouter.get()