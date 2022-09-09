import OrderController from "./OrderController.js";
import orderService from "../../../services/order/indexOrderService.js";
import userService from "../../../services/user/indexUserService.js";

const orderController = new OrderController(orderService, userService)

export default orderController