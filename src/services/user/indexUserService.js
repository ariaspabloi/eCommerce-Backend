import UserService from "./UserService.js";
import userDao from "../../db/indexUser.js";
import cartService from "../cart/indexCartService.js";

const userService = new UserService(userDao, cartService)

export default userService