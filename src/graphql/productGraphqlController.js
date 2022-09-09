import productService from "../services/product/indexProductService.js";

const service = productService

export async function getProduct({id}) {
    return await service.getProductById(id)
}

export async function getProducts({field, value}) {
    return await service.getProducts(field, value)
}

export async function createProduct({data}) {
    return await service.saveProduct(data)
}

export async function updateProduct({data, id}) {
    return await service.updateProduct(data, id)
}

export async function deleteProduct({id}) {
    return await service.deleteProduct(id)
}