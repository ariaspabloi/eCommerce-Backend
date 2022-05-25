const { getMessages, saveMessage } = require('../../databases/messages')
const { getProducts, saveProduct } = require('../../databases/products')

async function cnxEventController(socket, io) {
    console.log("Nuevo cliente")
    const messages = await getMessages()
    const products = await getProducts()
    socket.emit('products', { products })
    socket.emit('messages', { messages })
    socket.on('product', p => productEventController(socket, io, p))
    socket.on('message', msg => messageEventController(socket, io, msg))
}

async function messageEventController(socket, io, msg) {
    await saveMessage(msg)
    const messages = await getMessages()
    io.sockets.emit('messages', { messages })
}

async function productEventController(socket, io, p) {
    await saveProduct(p)
    const products = await getProducts()
    io.sockets.emit('products', { products })
}


module.exports = cnxEventController