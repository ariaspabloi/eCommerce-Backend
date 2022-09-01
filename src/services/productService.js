import productDao from '../db/indexProduct.js';
import Product from '../models/Product.js'

async function getProductById(id) {
    const data = await productDao.getById(id)
    const product = new Product(data)
    return product;
}

async function getProducts() {
    const data = await productDao.getAll()
    const products = data.map(d => new Product(d))
    return products;
}

async function saveProduct(data) {
    const product = new Product(data)
    const insertedProduct = await productDao.save(product.dto())
    return new Product(insertedProduct)
}

async function updateProduct(data, _id) {
    const product = new Product(data)
    await productDao.update(product.dto(), _id)
    return product
}

async function deleteProduct(_id) {
    await productDao.deleteById(_id)
}

export {getProductById, getProducts, saveProduct, updateProduct, deleteProduct};
