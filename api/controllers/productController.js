const { ProductDao } = require('../../persistence/ProductDao');
const productDao = new ProductDao("productos.txt");
const testMSG = "API Test /";

const productController = {
    info: (req, res) => {
        res.json(testMSG)
    },
    getProduct: async (req, res) => {
        const id = req.params.id
        try {
            const product = await productDao.getById(id);
            return res.json(product);
        } catch (error) {
            if (error.tipo === 'db not found') {
                res.status(404).json({ error: error.message })
            } else {
                res.status(500).json({ error: error.message })
            }
        }
    },
    getProducts: async (req, res) => {
        try {
            res.json(await productDao.getAll())
        } catch (error) {
            res.status(404).json({ error: error.message })
        }
    },
    postProduct: async (req, res) => {
        try {
            const personaAgregada = await productDao.save(req.body);
            res.status(201).json(personaAgregada)
        } catch (error) {
            res.status(404).json({ error: error.message })
        }
    },
    putProduct: async (req, res) => {
        try {
            const id = req.params.id
            const product = await productDao.update(req.body, id);
            return res.json(product);
        } catch (error) {
            res.status(404).json({ error: error.message })
            console.log("error",error.message)
        }
    },
    deleteProduct: async (req, res) => {
        try {
            const id = req.params.id
            await productDao.deleteById(id);
            res.sendStatus(204);
        } catch (error) {
            res.status(404).json({ error: error.message })
        }
    }
}

module.exports = { productController }