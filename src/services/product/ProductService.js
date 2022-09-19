import Product from '../../models/Product.js'
import Api404Error from "../../util/errors/Api404Error.js";
import Api400Error from "../../util/errors/Api400Error.js";
import Api500Error from "../../util/errors/Api500Error.js";
import BaseError from "../../util/errors/BaseError.js";
import {generateId} from "../../util/helpers.js";

export default class ProductService {
    #dao

    constructor(dao) {
        this.#dao = dao
    }

    async getProductById(id) {
        try {
            console.log(8282, id)
            const data = await this.#dao.getById(id)
            console.log(8282, data)
            if (data == null) throw new Api404Error(`User with id ${id} not found.`)
            const product = new Product(data)
            return product;
        } catch (e) {
            if (e instanceof BaseError) throw e;
            throw new Api500Error(`Error al recupar producto de id ${id}`)
        }
    }

    async getProducts(field = "none", value = "none") {
        try {
            let products = await this.#dao.getAll()
            if (field !== "none" && value !== "none") {
                products = products.filter(d => d[field] == value)
            }
            products = products.map(d => new Product(d))
            return products;
        } catch (e) {
            if (e instanceof BaseError) throw e;
            throw new Api500Error(`Error al recuperar todos los productos`)
        }
    }

    async saveProduct(data) {
        try {
            data.id = generateId()
            const product = new Product(data)
            const insertedProduct = await this.#dao.save(product.dto())
            return new Product(insertedProduct)
        } catch (e) {
            if (e instanceof BaseError) throw e;
            throw new Api500Error(`Error al guardar producto ${data.name}`)
        }
    }

    async updateProduct(data, id) {
        try {
            const product = new Product(data)
            await this.#dao.update(product.dto(), id)
            return product
        } catch (e) {
            if (e instanceof BaseError) throw e;
            throw new Api404Error(`Error al actualizar producto con id ${id}`)
        }
    }

    async deleteProduct(id) {
        try {
            await this.#dao.deleteById(id)
        } catch (e) {
            throw new Api400Error(`Producto de id ${id} no encontrado para borrar`)
        }
    }
}