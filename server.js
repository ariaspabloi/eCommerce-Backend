//npm run start:dev
const { createServer } = require("http");
const { Server } = require("socket.io");
const express = require('express')
const webRouter = require('./frontend/routers/webRouter.js')
const cnxEventController = require('./frontend/controllers/sockets/socketController');
const { routerApiCart } = require("./api/routers/routerApiCart.js");
const { routerApiProduct } = require("./api/routers/routerApiProduct.js");
const bodyParser = require('body-parser');
const app = express()
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static('public'))

app.use(bodyParser.json());
app.use('/', webRouter)
app.use('/api/productos',routerApiProduct)
app.use('/api/carritos',routerApiCart)
app.all('*', (req, res) => {
    res.status(404).json({error:-2,descripcion:`Ruta ${req.originalUrl} metodo ${req.method} no implementada`});
})

io.on('connection', socket => cnxEventController(socket, io))

const PORT = 8080
const server = httpServer.listen(PORT, () => {
    console.log(`Server corriendo puerto: ${server.address().port}`)
})