import OrderRouter from "./OrderRouter.js";
import orderController from "../../controllers/order/indexOrderController.js";

const orderRouter = new OrderRouter(orderController)

export default orderRouter.get()