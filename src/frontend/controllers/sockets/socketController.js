const productDao = require('../../../models/indexProduct')
const { getMessages, saveMessage } = require('../../../services/messageService.js')


async function cnxEventController(socket, io) {
    const messages = await getMessages()
    const products = await productDao.getAll()
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
    await productDao.save(p)
    const products = await productDao.getAll()
    io.sockets.emit('products', { products })
}


module.exports = cnxEventController