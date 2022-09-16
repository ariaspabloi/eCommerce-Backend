//npm run start:dev
//const { routerApiMockup } = require('./api/routers/routerApiMockup')
import {createServer} from 'http';

import {Server} from 'socket.io';
import express from 'express';
import webRouter from './frontend/routers/webRouter.js';
import cnxEventController from './frontend/controllers/sockets/socketController.js';
import bodyParser from 'body-parser';
import sessionMiddleware from './api/middlewares/sessionMiddleware.js';
import {passportSessionHandler, passportMiddleware} from './api/middlewares/passportMiddleware.js';
import infoRouter from './api/routers/info/indexInfoRouter.js';
import randomRouter from './api/routers/random/indexRandomRouter.js';
import authRouter from './api/routers/auth/indexAuthRouter.js';
import userRouter from './api/routers/users/indexUserRouter.js';
import orderRouter from './api/routers/order/indexOrderRouter.js';
import uploadRouter from './api/routers/upload/indexUploadRouter.js';
import productRouter from './api/routers/product/indexProductRouter.js'
import cartRouter from './api/routers/cart/indexCartRouter.js'
import requireAuthorization from './api/middlewares/authorizationMiddleware.js';
import logger from './util/logger.js';
import {mode} from './config.js';
import {graphqlMiddleware} from "./graphql/graphqlMiddleware.js";
import {logErrorMiddleware, returnError} from "./api/middlewares/errorHandler.js";
import cluster from 'cluster';
import os from 'os';
import parseArgs from 'minimist';
import loggerMiddleware from "./api/middlewares/loggerMiddleware.js";
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


const options = {
    default: {
        port: 8080
    }
}

const args = parseArgs(process.argv.slice(2), options)
const PORT = process.env.PORT || args.port
if (mode === "CLUSTER" && cluster.isPrimary) {
    const numCPUs = os.cpus().length
    for (let i = 0; i < numCPUs; i++) cluster.fork()
    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`)
        cluster.fork()
    })
} else {

    /////////////////Server setup(with socket)
    const app = express()
    const httpServer = createServer(app);
    const io = new Server(httpServer)

    /////////////////Middlewares
    app.use(express.static('./src/public'))
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(loggerMiddleware)
    app.use(sessionMiddleware)
    app.use(passportMiddleware)
    app.use(passportSessionHandler)
    app.use('/graphql', graphqlMiddleware)
    /////////////////Routers
    app.use('/', webRouter)
    app.use('/api/info', requireAuthorization, infoRouter)
    app.use('/api/randoms', randomRouter)
    app.use('/api/upload', uploadRouter)
    app.use('/api/users', userRouter)
    app.use('/', authRouter)
    app.use('/api/products', productRouter)
    app.use('/api/orders', orderRouter)
    app.use('/api/shoppingcartproducts', requireAuthorization, cartRouter)
    //app.use('/api/productos-test', requireAuthorization, routerApiMockup)
    app.use(logErrorMiddleware)
    app.use(returnError)
    app.all('*', (req, res) => {
        logger.warn(`Ruta ${req.originalUrl} metodo ${req.method} no implementada`)
        res.status(404).json({error: -2, descripcion: `Ruta ${req.originalUrl} metodo ${req.method} no implementada`});
    })

    /////////////////Socket setup
    io.on('connection', socket => cnxEventController(socket, io))

    /////////////////Run Server
    const server = httpServer.listen(PORT, () => {
        console.log(`Server corriendo puerto : ${server.address().port}`)
    })
}