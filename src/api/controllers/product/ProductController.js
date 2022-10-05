import logger from '../../../util/logger.js';

export default class ProductController {
    #service

    constructor(service) {
        this.#service = service
    }

    getProduct = async (req, res, next) => {
        try {
            const id = req.params.id
            const product = await this.#service.getProductById(id);
            return res.status(201).json(product.dto());
        } catch (e) {
            logger.error(`Error getProduct: ${e}`)
            next(e)
        }
    }

    getProducts = async (req, res, next) => {
        try {
            const products = await this.#service.getProducts()
            const productsDto = products.map(p => p.dto())
            res.status(201).json(productsDto)
        } catch (e) {
            logger.error(`Error getProducts: ${e}`)
            next(e)
        }
    }

    postProduct = async (req, res, next) => {
        try {
            const newProduct = await this.#service.saveProduct(req.body);
            res.status(201).json(newProduct.dto())
        } catch (e) {
            logger.error(`Error postProducts: ${e}`)
            next(e)
        }
    }

    putProduct = async (req, res, next) => {
        try {
            const id = req.params.id
            const product = await this.#service.updateProduct(req.body, id)
            return res.status(201).json(product.dto());
        } catch (e) {
            logger.error(`Error putProduct: ${e}`)
            next(e)
        }
    }

    deleteProduct = async (req, res, next) => {
        try {
            const id = req.params.id
            await this.#service.deleteProduct(id)
            res.status(201).json({message: 'ok'});
        } catch (e) {
            logger.error(`Error deleteProduct: ${e}`)
            next(e)
        }
    }
}