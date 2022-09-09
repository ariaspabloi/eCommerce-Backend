import ProductRouter from "./ProductRouter.js";
import productController from "../../controllers/product/indexProductController.js";

const productRouter = new ProductRouter(productController)

export default productRouter.get()