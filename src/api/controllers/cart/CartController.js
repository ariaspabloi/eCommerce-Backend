const testMSG = "API Test /";

export default class CartController {
    #service

    constructor(service) {
        this.#service = service
    }

    info = async (req, res) => {
        res.json(testMSG)
    }


    postAddProduct = async (req, res) => {
        try {
            const cartId = (await req.user).id
            await this.#service.addProduct(cartId, req.body.productId)
        } catch (error) {
            res.status(404).json({error: error.message});
        }
        res.status(201).json()
    }

    getProducts = async (req, res) => {
        try {
            const cartId = (await req.user).id
            const products = await this.#service.getCartProducts(cartId)
            res.status(201).json(products)
        } catch (error) {
            res.status(404).json({error: error.message});
        }
    }

    deleteProduct = async (req, res) => {
        try {
            const cartId = (await req.user).id
            const productId = req.params.productId
            await this.#service.deleteProduct(cartId, productId)
        } catch (error) {
            res.status(404).json({error: error.message});
        }
        res.status(201).json()
    }

    deleteEmptyCart = async (req, res) => {
        try {
            const cartId = await req.user.id
            await this.#service.emptyCart(cartId)
            res.status(204).json()
        } catch (error) {
            res.status(404).json({error: error.message});
        }
    }
}