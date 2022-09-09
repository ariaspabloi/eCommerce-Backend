import CartRouter from "./CartRouter.js";
import cartController from "../../controllers/cart/indexCartController.js";

const cartRouter = new CartRouter(cartController)

export default cartRouter.get()