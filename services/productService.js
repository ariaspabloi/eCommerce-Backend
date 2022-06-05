
const { ProductDao } = require('../persistence/ProductDao');
const { mysql } = require('../options/dbConnections')
const productDao = new ProductDao(mysql);
let products;

async function startProductsService() {
    await productDao.createTable();
    products = await productDao.getAll();
}

async function getProducts(){
    try{
        products = await productDao.getAll();
        products = products.map(p => JSON.parse(JSON.stringify(p)))
    }catch(error){
        throw error;
    }
    return products;
}

async function saveProduct(product){
    await productDao.save(product)
}

module.exports = { getProducts,saveProduct,startProductsService }
