import assert from 'assert'
import axios from 'axios'

const url = 'http://localhost:8080/api/products'
const loginUrl = 'http://localhost:8080/login'
const getIdData = '6319385724c7b06d1a9c664f'
const updateIdData = '63193905a6c06cd95f95402c'
let deleteId;
const productData = {
    "name": "Papa Noel TEST",
    "description": "El mejor Papa Noel",
    "price": 1500,
    "image": "IMAGE_URL"
}
const updateProductData = {
    "name": "Papa Noel Updated",
    "description": "El peor Papa Noel",
    "price": 9999,
    "image": "IMAGE_URL"
}
const loginData = {
    "email": "7@ethereal.email",
    "password": "1234"
}

//await login()


describe('api products', () => {
    describe('by sending valid data...', () => {
        it('create, save and return status 201', async () => {
            const {data, status} = await axios.post(url, productData)

            assert.strictEqual(status, 201)

            assert.ok(data)
            assert.ok(data.id)

            const {data: getProduct} = await axios.get(url + '/' + data.id)
            deleteId = getProduct.id
            delete getProduct.id
            assert.deepStrictEqual(getProduct, productData)
        })
    })

    describe('by retriving one product data...', () => {
        it('get a product by id and return status 201', async () => {
            const {data, status} = await axios.get(url + '/' + getIdData, productData)
            assert.strictEqual(status, 201)
            assert.ok(data)
            delete data.id
            assert.deepStrictEqual(data, productData)
        })
    })

    describe('updating a product by id', () => {
        it('update and return valid data and status 201', async () => {
            const {data, status} = await axios.put(url + '/' + updateIdData, updateProductData)
            assert.strictEqual(status, 201)
            assert.ok(data)
            const {data: getProduct} = await axios.get(url + '/' + updateIdData)
            delete getProduct.id
            assert.deepStrictEqual(getProduct, updateProductData)
        })
    })

    describe('updating a product by id', () => {
        it('update and return valid data and status 201', async () => {
            const {data, status} = await axios.put(url + '/' + updateIdData, updateProductData)
            assert.strictEqual(status, 201)
            assert.ok(data)
            const {data: getProduct} = await axios.get(url + '/' + updateIdData)
            delete getProduct.id
            assert.deepStrictEqual(getProduct, updateProductData)
        })
    })
    describe('geting all products', () => {
        it('return an array with all the products and status 201', async () => {
            const {data, status} = await axios.get(url)
            assert.strictEqual(status, 201)
            assert.ok(data)
            assert.ok(Array.isArray(data))
            assert.ok(data.filter(p => p.id === getIdData).length > 0)
        })
    })
    describe('deleting a product by id', () => {
        it('delete and return status 201', async () => {
            const {data, status} = await axios.delete(url + '/' + deleteId)
            assert.strictEqual(status, 201)
        })
    })
})

async function login() {
    const {data, status} = await axios.post(loginUrl, loginData)
    if (status != 201) throw Error("login fail")
}