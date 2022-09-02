import {addProduct, getCartProducts, deleteProduct, emptyCart} from '../../services/cartService.js';

const testMSG = "API Test /";

export const cartController = {
    info: (req, res) => {
        res.json(testMSG)
    },
    postAddProduct: async (req, res) => {
        try {
            const cartId = (await req.user).id
            await addProduct(cartId, req.body.productId)
        } catch (error) {
            res.status(404).json({error: error.message});
        }
        res.status(201).json()
    },
    getProducts: async (req, res) => {
        try {
            const cartId = (await req.user).id
            const products = await getCartProducts(cartId)
            res.status(201).json(products)
        } catch (error) {
            res.status(404).json({error: error.message});
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const cartId = (await req.user).id
            const productId = req.params.productId
            await deleteProduct(cartId, productId)
        } catch (error) {
            res.status(404).json({error: error.message});
        }
        res.status(201).json()
    },
    deleteEmptyCart: async (req, res) => {
        try {
            const cartId = await req.user.id
            await emptyCart(cartId)
            res.status(204).json()
        } catch (error) {
            res.status(404).json({error: error.message});
        }
    }
}
