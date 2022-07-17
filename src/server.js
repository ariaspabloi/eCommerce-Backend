//npm run start:dev
const { createServer } = require("http");
const { Server } = require("socket.io");
const express = require('express')
const webRouter = require('./frontend/routers/webRouter.js')
const cnxEventController = require('./frontend/controllers/sockets/socketController');
const { routerApiCart } = require("./api/routers/routerApiCart.js");
const { routerApiProduct } = require("./api/routers/routerApiProduct.js");
const bodyParser = require('body-parser');
const { routerApiMockup } = require('./api/routers/routerApiMockup')
const sessionMiddleware = require('./api/middlewares/sessionMiddleware')
const { passportSessionHandler, passportMiddleware } = require("./api/middlewares/passportMiddleware");
const routerAuth = require('./api/routers/routerAuth')
const routerApiInfo = require('./api/routers/routerApiInfo')
const routerInfo = require('./api/routers/routerInfo')
const routerApiRandom = require('./api/routers/routerApiRandom')
const requireAuthorization = require('./api/middlewares/authorizationMiddleware')

/////////////////Server setup(with socket)
const app = express()
const httpServer = createServer(app);
const io = new Server(httpServer);

/////////////////Middlewares
app.use(express.static('./src/public'))
app.use(bodyParser.json());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(sessionMiddleware)
app.use(passportMiddleware)
app.use(passportSessionHandler)

/////////////////Routers
app.use('/', webRouter)
app.use('/info', routerInfo)
app.use('/api/randoms', routerApiRandom)
app.use('/auth', routerAuth)
app.use('/api/info', requireAuthorization, routerApiInfo)
app.use('/api/productos', requireAuthorization, routerApiProduct)
app.use('/api/carritos', requireAuthorization, routerApiCart)
app.use('/api/productos-test', requireAuthorization, routerApiMockup)
app.all('*', (req, res) => {
    res.status(404).json({ error: -2, descripcion: `Ruta ${req.originalUrl} metodo ${req.method} no implementada` });
})

/////////////////Socket setup
io.on('connection', socket => cnxEventController(socket, io))


/////////////////Get port by arguments
//node src/server.js --port 8081
const parseArgs = require('minimist')
const options = {
    default: {
        port: 8080
    }
}
const args = parseArgs(process.argv.slice(2), options)
const PORT = args.port
/////////////////Run Server
const server = httpServer.listen(PORT, () => {
    console.log(`Server corriendo puerto: ${server.address().port}`)
})