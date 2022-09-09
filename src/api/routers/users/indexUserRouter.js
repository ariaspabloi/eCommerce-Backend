import {UserRouter} from "./UserRouter.js";
import userController from "../../controllers/user/indexUserController.js";

const userRouter = new UserRouter(userController)

export default userRouter.get()