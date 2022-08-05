//npm run start:dev
const { createServer } = require("http");
const { Server } = require("socket.io");
const express = require('express')
const webRouter = require('./frontend/routers/webRouter.js')
const cnxEventController = require('./frontend/controllers/sockets/socketController');
const { routerApiCart } = require("./api/routers/routerApiCart.js");
const { routerApiProduct } = require("./api/routers/routerApiProduct.js");
const bodyParser = require('body-parser');
//const { routerApiMockup } = require('./api/routers/routerApiMockup')
const sessionMiddleware = require('./api/middlewares/sessionMiddleware')
const { passportSessionHandler, passportMiddleware } = require("./api/middlewares/passportMiddleware");
const routerAuth = require('./api/routers/routerAuth')
const routerApiInfo = require('./api/routers/routerApiInfo')
const routerInfo = require('./api/routers/routerInfo')
const routerApiRandom = require('./api/routers/routerApiRandom')
const requireAuthorization = require('./api/middlewares/authorizationMiddleware')
const loggerMiddleware = require('./api/middlewares/loggerMiddleware')
const logger = require('./util/logger')


/////////////////Get arguments and cluster||fork
//node src/server.js --port 8081
////NODEMON
//nodemon src/server.js --port 8080 --mode CLUSTER
//nodemon src/server.js --port 8080 --mode FORK
////FOREVER
//forever start src/server.js --port 8080 --mode FORK
//forever stopall
////PM2
//MODO FORK
//pm2 start src/server.js --name="Server1" --watch -- --port 8082 --mode FORK
//pm2 start src/server.js --name="Server2" --watch -- --port 8082 --mode FORK
//MODO CLUSTER
//pm2 start src/server.js --name="ServerX" --watch -i max -- --port 8082 --mode FORK
//pm2 delete all

const cluster = require ('cluster')
const os = require('os')

const parseArgs = require('minimist')
const options = {
    default: {
        port: 8080,
        mode: "FORK"
    }
}
const args = parseArgs(process.argv.slice(2), options)
const PORT = args.port
const MODE = args.mode
if(MODE==="CLUSTER" && cluster.isPrimary){
    const numCPUs = os.cpus().length
    for (let i = 0; i < numCPUs; i++) cluster.fork()
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`)
        cluster.fork()
    })
}else{

    /////////////////Server setup(with socket)
    const app = express()
    const httpServer = createServer(app);
    const io = new Server(httpServer)

    /////////////////Middlewares
    app.use(express.static('./src/public'))
    app.use(bodyParser.json());
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))
    app.use(loggerMiddleware)
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
    //app.use('/api/productos-test', requireAuthorization, routerApiMockup)
    app.all('*', (req, res) => {
        logger.warn(`Ruta ${req.originalUrl} metodo ${req.method} no implementada`)
        res.status(404).json({ error: -2, descripcion: `Ruta ${req.originalUrl} metodo ${req.method} no implementada` });
    })

    /////////////////Socket setup
    io.on('connection', socket => cnxEventController(socket, io))

    /////////////////Run Server
    const server = httpServer.listen(PORT, () => {
        console.log(`Server corriendo puerto : ${server.address().port}`)
    })
}