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

    async getProducts(field = "none", value = "none") {
        let products = await this.#dao.getAll()
        if (field !== "none" && value !== "none") {
            products = products.filter(d => d[field] == value)
        }
        products = products.map(d => new Product(d))
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