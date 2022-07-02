//npm run start:dev
const { startProductsService } = require('./services/productService')
const { createServer } = require("http");
const { Server } = require("socket.io");
const express = require('express')
const session = require('express-session')
const webRouter = require('./frontend/routers/webRouter.js')
const cnxEventController = require('./frontend/controllers/sockets/socketController');
const { routerApiCart } = require("./api/routers/routerApiCart.js");
const { routerApiProduct } = require("./api/routers/routerApiProduct.js");
const bodyParser = require('body-parser');
const { routerApiMockup } = require('./api/routers/routerApiMockup')
const MongoStore = require('connect-mongo');
const { routerApiLogin } = require('./api/routers/routerApiLogin');

const app = express()
const httpServer = createServer(app);
const io = new Server(httpServer);
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
app.use(session({
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://mongodb:mongodbpassword@cluster0.ot66qlp.mongodb.net/?retryWrites=true&w=majority",
        mongoOptions: advancedOptions
    }),

    secret: 'shhhhhhhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 10 * 60 * 1000
    }
}))

app.use(express.static('public'))
app.use(bodyParser.json());

app.use('/', webRouter)
app.use('/', routerApiLogin)
app.use('/api/productos', routerApiProduct)
app.use('/api/carritos', routerApiCart)
app.use('/api/productos-test', routerApiMockup)
app.all('*', (req, res) => {
    res.status(404).json({ error: -2, descripcion: `Ruta ${req.originalUrl} metodo ${req.method} no implementada` });
})

startProductsService()
io.on('connection', socket => cnxEventController(socket, io))

const PORT = 8080
const server = httpServer.listen(PORT, () => {
    console.log(`Server corriendo puerto: ${server.address().port}`)
})