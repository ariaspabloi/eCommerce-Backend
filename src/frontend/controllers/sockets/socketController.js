import productDao from '../../../db/indexProduct.js';
import messageService from "../../../services/message/indexMessageService.js";


async function cnxEventController(socket, io) {
    const messages = await messageService.getMessages()
    const products = await productDao.getAll()
    socket.emit('products', {products})
    socket.emit('messages', {messages})
    socket.on('product', p => productEventController(socket, io, p))
    socket.on('message', msg => messageEventController(socket, io, msg))
}

async function messageEventController(socket, io, msg) {
    await messageService.saveMessage(msg)
    const messages = await messageService.getMessages()
    io.sockets.emit('messages', {messages})
}

async function productEventController(socket, io, p) {
    await productDao.save(p)
    const products = await productDao.getAll()
    io.sockets.emit('products', {products})
}


export default cnxEventController;