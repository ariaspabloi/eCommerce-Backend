import logger from '../../../util/logger.js';

const testMSG = "API Test /";


export default class ProductController {
    #service

    constructor(service) {
        this.#service = service
    }

    info = (req, res) => {
        res.json(testMSG)
    }

    getProduct = async (req, res) => {
        const id = req.params.id
        try {
            const product = await this.#service.getProductById(id);
            return res.status(201).json(product.dto());
        } catch (error) {
            logger.error('Error getProduct')
            if (error.tipo === 'db not found') {
                res.status(404).json({error: error.message})
            } else {
                res.status(500).json({error: error.message})
            }
        }
    }

    getProducts = async (req, res) => {
        try {
            const products = await this.#service.getProducts()
            const productsDto = products.map(p => p.dto())
            res.status(201).json(productsDto)
        } catch (error) {
            logger.error('Error getProducts')
            res.status(404).json({error: error.message})
        }
    }

    postProduct = async (req, res) => {
        try {
            const personaAgregada = await this.#service.saveProduct(req.body);
            res.status(201).json(personaAgregada.dto())
        } catch (error) {
            logger.error('Error postProducts')
            res.status(404).json({error: error.message})
        }
    }

    putProduct = async (req, res) => {
        try {
            const id = req.params.id
            const product = await this.#service.updateProduct(req.body, id)
            return res.status(201).json(product.dto());
        } catch (error) {
            logger.error('Error putProducts')
            res.status(404).json({error: error.message})
        }
    }

    deleteProduct = async (req, res) => {
        try {
            const id = req.params.id
            await this.#service.deleteProduct(id)
            res.sendStatus(201);
        } catch (error) {
            logger.error('Error deleteProducts')
            res.status(404).json({error: error.message})
        }
    }
}