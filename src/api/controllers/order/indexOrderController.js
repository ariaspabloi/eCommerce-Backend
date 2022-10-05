import OrderController from "./OrderController.js";
import orderService from "../../../services/order/indexOrderService.js";

const orderController = new OrderController(orderService)

export default orderController