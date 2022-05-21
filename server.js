//npm run start:dev
const express = require('express')
const bp = require('body-parser')
const exphbs = require('express-handlebars')
const { apiControllers } = require('./controllers/apiControllers.js')
const { routerApiProducts } = require('./routers/routerApiProducts.js')
const { ProductDao } = require('./databases/ProductDao.js')
const productDao = new ProductDao("productos.txt");
const app = express()

const handlebarsConfig = {
    defaultLayout: 'index.handlebars'
}
app.use(express.urlencoded({
    extended: true
}))
app.engine('.handlebars', exphbs.engine({ extname: '.handlebars', defaultLayout: "index"}));
app.set('views', './views')
app.set('view engine', 'handlebars')



app.get('/', (req, res) => {
    res.render('index', {title:"Agrega un producto"});
});
app.get('/productos', async (req, res) =>  {
    res.render('productos', {title:"Productos",products: await productDao.getAll()});
});
app.post('/productos', (req, res) => {
    productDao.save(req.body);
    res.render('index', {title:"Agregado",loaded: true});
});

app.use(routerApiProducts)

const PORT = 8080
const server = app.listen(PORT, () => {
    console.log(`Server corriendo puerto: ${server.address().port}`)
})
server.on('error', error => { console.log(error.message) })