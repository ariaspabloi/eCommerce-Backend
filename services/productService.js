
const { ProductDao } = require('../persistence/ProductDao');
const productDao = new ProductDao("productos.txt");
let products = productDao.getAll();

async function getProducts(){
    try{
        products = await productDao.getAll();
    }catch(error){
        throw error;
    }
    return products;
}

async function saveProduct(product){
    await productDao.save(product)
}

module.exports = { getProducts,saveProduct }
