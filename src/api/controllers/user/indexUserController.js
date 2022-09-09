import passport from 'passport';
import UserController from "./userController.js";

const userController = new UserController(passport)

export default userController