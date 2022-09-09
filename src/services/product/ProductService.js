import Product from '../../models/Product.js'

export default class ProductService {
    #dao

    constructor(dao) {
        this.#dao = dao
    }

    async getProductById(id) {
        const data = await this.#dao.getById(id)
        const product = new Product(data)
        return product;
    }

    async getProducts() {
        const data = await this.#dao.getAll()
        const products = data.map(d => new Product(d))
        return products;
    }

    async saveProduct(data) {
        const product = new Product(data)
        const insertedProduct = await this.#dao.save(product.dto())
        return new Product(insertedProduct)
    }

    async updateProduct(data, _id) {
        const product = new Product(data)
        await this.#dao.update(product.dto(), _id)
        return product
    }

    async deleteProduct(_id) {
        await this.#dao.deleteById(_id)
    }
}