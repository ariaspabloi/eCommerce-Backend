import OrderService from "./OrderService.js";
import orderDao from "../../db/indexOrder.js";
import cartService from "../cart/indexCartService.js";

const orderService = new OrderService(orderDao, cartService)

export default orderService