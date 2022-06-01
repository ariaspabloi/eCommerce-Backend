const { newCartId, addProduct, getCartProducts, deleteProduct, emptyCart } = require('../../services/cartService')

const testMSG = "API Test /";

const cartController = {
    info: (req, res) => {
        res.json(testMSG)
    },
    postNewCart: async (req, res) => {
        let newId;
        try {
            newId = await newCartId();
            console.log(newId);
            res.status(201).json(newId)
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    postAddProduct: async (req, res) => {
        try {
            const cartId = req.params.cartId
            await addProduct(cartId, req.body.productId)
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
        res.status(201).json()
    },
    getProducts: async (req, res) => {
        try {
            const cartId = req.params.cartId
            const products = await getCartProducts(cartId)
            res.status(201).json(products)
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const cartId = req.params.cartId
            const productId = req.params.productId
            await deleteProduct(cartId, productId)
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
        res.status(201).json()
    },
    deleteEmptyCart: async (req, res) => {
        try {
            const cartId = req.params.cartId
            await emptyCart(cartId)
            res.status(204).json()
        } catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
}

module.exports = { cartController }