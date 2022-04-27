const {ProductDao} = require('../databases/ProductDao');
const productDao = new ProductDao("productos.txt");
const testMSG = "API Test /";

const apiControllers = {
    info: (req, res) => {
        res.json(testMSG)
    },
    products: async (req, res) => {
        res.json(await productDao.getAll())
    },
    randomProduct: async (req, res) => {
        const data = await productDao.getAll();
        return res.json(data[Math.floor(Math.random()*data.length)]);
    }
}

module.exports = { apiControllers }