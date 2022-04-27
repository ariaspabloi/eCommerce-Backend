//npm run start:dev
const express = require('express')
const { apiControllers } = require('./controllers/apiControllers.js')
const app = express()

app.get('/', apiControllers.info)
app.get('/productos', apiControllers.products)
app.get('/productosRandom', apiControllers.randomProduct)

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Server corriendo puerto: ${server.address().port}`)
})
server.on('error', error => { console.log(error.message) })