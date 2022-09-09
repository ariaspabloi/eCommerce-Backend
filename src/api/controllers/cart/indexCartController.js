import CartController from "./CartController.js";
import cartService from "../../../services/cart/indexCartService.js";

const cartController = new CartController(cartService)

export default cartController