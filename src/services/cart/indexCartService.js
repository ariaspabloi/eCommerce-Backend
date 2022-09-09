import cartDao from "../../db/indexCart.js";
import CartService from "./CartService.js";
import productService from "../product/indexProductService.js";

const cartService = new CartService(cartDao, productService)

export default cartService