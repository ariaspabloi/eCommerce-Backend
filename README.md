<a name="readme-top"></a>
<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/ariaspabloi/eCommerce-Backend">
    <img src="https://www.jacobsoft.com.mx/wp-content/uploads/2020/04/node-js-736399_960_720-2.png" alt="Logo" width="160" height="80">
  </a>

<h3 align="center">eCommerce-Backend</h3>

  <p align="center">
    Backend de un sitio de e-Commerce, hecho con Node-JS y MongoDB/Firebase.
    <br />
    <br />
    <a href="https://concrete-florentine-sunfish.glitch.me">View Demo</a>
    ·
    <a href="https://github.com/ariaspabloi/eCommerce-Backend/issues">Reportar Bug</a>
    ·
    <a href="https://github.com/drmaquino/ch-backend-31825/tree/master/tp%20final/api%20tests">Api tests(ThunderClient)</a>
  </p>
</div>


<!-- ABOUT THE PROJECT -->

## Sobre el proyecto

Servicio web de API REST de microservicios construido con Express y MongoDB/Firebase, posee autentificacion de usuarios,
manejo de productos, carritos y ordenes.
Proyecto realizado para el Curso de BackEnd en CoderHouse.\
Adicionalmente tiene un chat de frontend y muestra info. sobre el servidor en que se corre, con el fin de implementar
socket.io y handlebars.

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>

### Realizado con

* ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
* ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
* ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
* ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
* ![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)
* ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
* ![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white)
* ![Socket.io](https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101)

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>



<!-- GETTING STARTED -->

## Empezando

### Caracteristicas

- Servicio API REST
- Implementacion de microservicios
- Persistencia a traves de base de datos no relacional(MongoDB o Firebase)
- Creacion y login de usuarios a través de Passport JWT, con encriptacion de contraseña
- Subida de imagenes
- Error handling
- Logger de error, warn, info.
- Uso de patron factory
- Uso de POO para inyeccion de dependencias en services y dao's
- Uso de POO para validacion de campos
- Notificacion de ordenes con Twilio y Gmail(nodemailer)

#### Otras caracteristicas

- Uso de handlebars del lado del servidor y cliente
- Chat con persistencia via sockets
- Uso basico de graphql y patron repository

### Prerequisitos

- Informacion de autentificacion a base de datos mongodb, ya sea en la nube(MongoDB Cloud) o de forma local.
- En caso de querer usar firestore en vez de mongodb, archivo de autentificacion de firebase adminskd en formato .json.
- Correo y contraseña de aplicaciones en gmail, para hacer uso de nodemailer para la notificacion de ordenes.
- Tener el TOKEN Y ID de la cuenta en twilio, para notificar al WhatsApp del cliente y administrador.(Opcional y
  desactivado en codigo debido a ser servicio de pago)

### Instalacion

1. Crea una [contraseña de aplicaciones](https://myaccount.google.com/apppasswords) para una cuenta de Gmail.
2. Crea una base de datos en [MongoDb Cloud](https://cloud.mongodb.com) , copia la el link de coneccion en la seccion
   ´Connect To Your Cluster´ (O montar la base de datos en un servidor privado).
3. Crea una cuenta en [Twilio](https://console.twilio.com/develop/explore) y activa la seccion de Whatsapp(opcional,
   codigo desactivado por defecto).
4. Clonar el repositorio
   ```sh
   git clone https://github.com/ariaspabloi/eCommerce-Backend.git
   ```
5. Instalar paquetes del NPM
   ```sh
   npm install
   ```
6. Crea un archivo de nombre ´.env´ en la carpeta raiz, ´eCommerce-Backend/.env´ y especifica la configuracion
   ```js
    ENV=PROD o DEV              //en modo DEV se conecta a base local de mongodb, PROD a cloud
    MODE=FORK o CLUSTER         //FORK una sola instancia, CLUSTER para aprovechar todos los nucleos del CPU.
    PORT=8080                   //puerto del servicor
    ADMIN_EMAIL=admin@admin.com //correo a notificar y con permisos de modificacion
    JWT_EXPIRETIME=1200000      //tiempo de duracion de sesion
    JWT_SECRETKEY=dxcvabs       //key para encriptar sesiones de JWT
    DB=mongodb o firebase       //base de datos a usar
    MAIL_AUTH_USER=correo@gmail.com     //correo gmail usado para notificar ordenes
    MAIL_AUTH_PASS=xxxxxxxxxxxxxxxx     //contraseña de aplicacion del correo gmail
    TWILIO_ID=xxxxxxxxxxxxxxxx          //id de twilio
    TWILIO_TOKEN=xxxxxxxxxxxxxxxx       //token de twilio
    TWILIO_SMS_NUMBER=+xxxxxxxxxx       //sms twilio
    TWILIO_WHATSAPP_NUMBER=whatsapp:+xxxxxxxxxx //numero wsp de twilio
    SMS_ADMIN=+xxxxxxxx                     //sms del admin a notificar
    WHATSAPP_ADMIN=whatsapp:+xxxxxxxx       //wsp del admin a notificar
    MONGODBUSER=xxxxxxxx        //Usuario de base de datos de mongodb
    MONGODBSERVER=cluster0.ot66qlp.mongodb.net  //Direccion del servidor de mongodb
    MONGODBPASSWORD=xxxxxxx     //Contraseña de base de datos de mongodb
   ```
7. En caso de querer usar firebase, generar el archivo de autenticacion sdk de extension .json y situarlo en la carpeta
   eCommerce-Backend/src/db/, y en el archivo de configuracion eCommerce-Backend/src/config.js importarlo de la
   siguiente forma, ademas descomentar la funcion getFirestoreDb().

```js
import serviceAccount from "./db/NOMBRE_DEL_ARCHIVO.json" assert {type: "json"}
```

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>



<!-- USAGE EXAMPLES -->

## Uso

### Imagenes (para usuarios y productos)

- POST /api/images: agrega una nueva imagen al servidor (multer), y devuelve su url pública (express.static)

### Usuarios

- POST /api/users: registra un nuevo usuario

### Productos

- GET /api/products: devuelve todos los productos
- GET /api/products/{id}: devuelve un producto segun id
- POST /api/products: crea un producto (solo usuarios registrados, con permisos de admin)
- PUT /api/products/{id}: actualiza un producto segun su id (solo usuarios registrados, con permisos de admin)
- DELETE /api/products/{id}: borra un producto segun su id (solo usuarios registrados, con permisos de admin)

[ el nombre de usuario del admin se especifica en el archivo de configuracion .env ]

### Carritos

- GET /api/shoppingcartproducts: devuelve los productos de un carrito (solo usuarios registrados)
- POST /api/shoppingcartproducts: agrega producto al carrito segun su id (solo usuarios registrados)
- DELETE /api/shoppingcartproducts/{id}: quita un producto de un carrito (solo usuarios registrados)

### Ordenes

- POST /api/orders: crea una nueva orden (compra todo el contenido de un carrito y lo vacía, solo usuarios registrados)
- GET /api/orders: devuelve todas las ordenes de un usuario (solo usuarios registrados)

### Autenticacion

- POST /login: autentica a un usuario (ok? => JWT)

-------------------------------------------------------

## Caracteristicas de las entidades persistidas

### User

- id
- email (usuario para login)
- password (contraseña para login)
- name (nombre)
- lastname (apellido)
- phone (número telefónico)
- image (url de la foto de perfil)

### Products

- id
- name
- description
- price
- image (url de la foto del producto)

### Cart

- id (opcion: usar el mismo del cliente al que pertenece)
- productos y sus cantidades

ejemplo:
{
id: 1,
prods: [
{
prod: {
id,
name,
description,
price,
image,
},
cant: 2
},
{
prod: {
id,
name,
description,
price,
image,
},
cant: 1
}
]
}

### Order

{
id: 1,
fecha: (timestamp)
idCliente: 1,
prods: [
{
prod: {
id,
name,
description,
price,
image,
},
cant: 2
},
{
prod: {
id,
name,
description,
price,
image,
},
cant: 1
}
],
}

### Message

- id
- author
- text
- date

### Author

- email
- name
- lastname
- age
- alias
- avatar

Todo esto se persiste en MongoDB Local (dev) / Mongo Atlas (prod) / firebase

----------------------------------------------------------

<!-- CONTACT -->

## Contacto

Pablo Arias
pabloarias.ic@gmail.com [Linkedin](https://www.linkedin.com/in/ariaspabloi/)

<p align="right">(<a href="#readme-top">volver arriba</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/ariaspabloi/eCommerce-Backend.svg?style=for-the-badge

[contributors-url]: https://github.com/ariaspabloi/eCommerce-Backend/graphs/contributors

[forks-shield]: https://img.shields.io/github/forks/ariaspabloi/eCommerce-Backend.svg?style=for-the-badge

[forks-url]: https://github.com/ariaspabloi/eCommerce-Backend/network/members

[stars-shield]: https://img.shields.io/github/stars/ariaspabloi/eCommerce-Backend.svg?style=for-the-badge

[stars-url]: https://github.com/ariaspabloi/eCommerce-Backend/stargazers

[issues-shield]: https://img.shields.io/github/issues/ariaspabloi/eCommerce-Backend.svg?style=for-the-badge

[issues-url]: https://github.com/ariaspabloi/eCommerce-Backend/issues

[license-shield]: https://img.shields.io/github/license/ariaspabloi/eCommerce-Backend.svg?style=for-the-badge

[license-url]: https://github.com/ariaspabloi/eCommerce-Backend/blob/master/LICENSE.txt

[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555

[linkedin-url]: https://linkedin.com/in/ariaspabloi

[product-screenshot]: images/screenshot.png