const { ProductDao } = require('./ProductDao');
const productDao = new ProductDao("productos.txt");
let products = productDao.getAll();

async function getProducts(){
    products = await productDao.getAll();
    return products;
}

async function saveProduct(product){
    await productDao.save(product)
}

module.exports = { getProducts,saveProduct }