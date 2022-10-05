import {createServer} from 'http';
import {Server} from 'socket.io';
import express from 'express';
import webRouter from './frontend/routers/webRouter.js';
import cnxEventController from './frontend/controllers/sockets/socketController.js';
import authRouter from './api/routers/auth/indexAuthRouter.js';
import userRouter from './api/routers/user/indexUserRouter.js';
import orderRouter from './api/routers/order/indexOrderRouter.js';
import uploadRouter from './api/routers/upload/indexUploadRouter.js';
import productRouter from './api/routers/product/indexProductRouter.js'
import cartRouter from './api/routers/cart/indexCartRouter.js'
import {requireAuthorization} from './api/middlewares/authorizationMiddleware.js';
import logger from './util/logger.js';
import {graphqlMiddleware} from "./graphql/graphqlMiddleware.js";
import {logErrorMiddleware, returnError} from "./api/middlewares/errorHandler.js";
import loggerMiddleware from "./api/middlewares/loggerMiddleware.js";
import userInfo from "./api/routers/userInfo/userInfo.js";
import passport from "passport";
import {applyPassportStrategy} from "./api/middlewares/passportMiddleware.js";
import {port} from "./config.js";
import {engine} from 'express-handlebars';

export const runServer = () => {
    /////////////////Server setup(with socket)
    const app = express()
    const httpServer = createServer(app);
    const io = new Server(httpServer)
    /////////////////Middlewares
    app.use(express.json())
    app.use(express.urlencoded({extended: true}))
    app.use(loggerMiddleware)
    applyPassportStrategy(passport)
    app.use('/graphql', graphqlMiddleware)
    /////////////////Set up handlebars
    app.use(express.static('./src/public'))
    app.engine('handlebars', engine());
    app.set('view engine', 'handlebars');
    app.set('views', './views');
    /////////////////Routers
    app.use('/', webRouter)//web views
    app.use('/', authRouter)//logins
    app.use('/user', requireAuthorization, userInfo)//user->email id
    app.use('/api/images', uploadRouter)
    app.use('/api/users', userRouter)//register
    app.use('/api/products', productRouter)
    app.use('/api/shoppingcartproducts', requireAuthorization, cartRouter)
    app.use('/api/orders', requireAuthorization, orderRouter)
    app.use(logErrorMiddleware)
    app.use(returnError)
    app.all('*', (req, res) => {
        logger.warn(`Ruta ${req.originalUrl} metodo ${req.method} no implementada`)
        res.status(404).json({error: -2, descripcion: `Ruta ${req.originalUrl} metodo ${req.method} no implementada`});
    })

    /////////////////Socket setup
    io.on('connection', socket => cnxEventController(socket, io))

    /////////////////Run Server
    const server = httpServer.listen(port, () => {
        console.log(`Server corriendo puerto : ${server.address().port}`)
    })
}