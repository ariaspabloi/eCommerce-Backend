const cartDao = require("../models/indexCart");
const {ObjectId} = require("mongodb");

async function newCartId(_id) {
    const cart = { products: [], _id: new ObjectId(_id) }
    const saved = await cartDao.save(cart);
    return _id
}

async function addProduct(cartId, productId) {
    try {
        const cart = await cartDao.getById(cartId)
        cart.products.push(productId)
        await cartDao.update(cart, cartId)
    } catch (error) {
        throw error;
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

module.exports = { newCartId, addProduct, getCartProducts, deleteProduct, emptyCart }