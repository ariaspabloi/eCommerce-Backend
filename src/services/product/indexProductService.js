import ProductService from "./ProductService.js";
import productDao from "../../db/indexProduct.js";

const productService = new ProductService(productDao)

export default productService