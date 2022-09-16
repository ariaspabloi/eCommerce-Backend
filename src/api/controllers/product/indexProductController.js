import ProductController from "./ProductController.js";
import productService from "../../../services/product/indexProductService.js";

const productController = new ProductController(productService)

export default productController