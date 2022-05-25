//npm run start:dev
const { createServer } = require("http");
const { Server } = require("socket.io");
const express = require('express')
const bp = require('body-parser')
const { apiControllers } = require('./controllers/apiControllers.js')
const { routerApiProducts } = require('./routers/routerApiProducts.js')
const webRouter = require('./routers/webRouter.js')
const cnxEventController = require('./controllers/sockets/socketControllers.js')
const app = express()
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.static('public'))
//app.get('/', apiControllers.info)

app.use('/', webRouter)
app.use(routerApiProducts)

io.on('connection', socket => cnxEventController(socket, io))

const PORT = 8080
const server = httpServer.listen(PORT, () => {
    console.log(`Server corriendo puerto: ${server.address().port}`)
})