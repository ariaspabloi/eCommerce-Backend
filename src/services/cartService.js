import cartDao from '../db/indexCart.js';
import Cart from '../models/Cart.js'
import {getProductById} from "./productService.js";

async function newCartId(_id) {
    const cart = new Cart({_id})
    await cartDao.save(cart.dto())
    return cart
}

async function addProduct(cartId, productId) {
    try {
        const data = await cartDao.getById(cartId)
        const cart = new Cart(data)
        console.log("ax", productId)
        const product = await getProductById(productId)
        console.log("by", product.dto(), product)
        cart.addProduct(product.dto())
        await cartDao.update(cart.dto(), cartId)
    } catch (error) {
        throw error
    }
}

async function getCartProducts(cartId) {
    try {
        const cart = await cartDao.getById(cartId)
        return cart.products
    } catch (error) {
        throw error;
    }
}

async function deleteProduct(cartId, productId) {
    try {
        const cart = await cartDao.getById(cartId)
        for (let i = 0; i < cart.products.length; i++) {
            if (cart.products[i] == productId) {
                cart.products.splice(i, 1)
                break
            }
        }
        await cartDao.update(cart, cartId)
    } catch (error) {
        throw error;
    }
}

async function emptyCart(cartId) {
    try {
        const cart = await cartDao.getById(cartId)
        cart.products = []
        await cartDao.update(cart, cartId)
    } catch (error) {
        throw error;
    }
}

async function getCartById(id) {
    return await cartDao.getById(id)
}


export {newCartId, addProduct, getCartProducts, deleteProduct, emptyCart};