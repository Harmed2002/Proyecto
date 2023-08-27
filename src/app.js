import express from 'express';
// import productRouter from './routes/products.routes.js';
// import cartRouter from './routes/cart.routes.js';
import { engine } from 'express-handlebars';
import { __dirname } from './path.js';
import path from 'path';
import { Server } from 'socket.io';
import ProductManager from './ProductManager.js';

const PATH_PRODUCTS = './src/data/products.json';
const productManager = new ProductManager(PATH_PRODUCTS);

const prods = [];
const PORT = 8080;
const app = express();
// Subo el servidor Express
const serverExpress = app.listen(PORT, () => { console.log(`Servidor online en el puerto ${PORT}`) });

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, '/public'))); // Defino la ruta para los archivos estáticos

// Instancio el server de Socket.io
const io = new Server(serverExpress);
// Enciendo socket io. Este es el server del Socket ya que está en el backend
io.on('connection', (socket) => {
    console.log("Servidor Socket.io conectado");
    socket.on('mensajeConexion', (user) => {
        if (user.rol === "Admin") {
            socket.emit("credencialesConexion", "Usuario Válido");

        } else {
            socket.emit("credencialesConexion", "Usuario No Válido");
        }
    });

    socket.on('nuevoProducto', async (nuevoProd) => {
        // Se guarda en productManager
        const thumbnail = ["No Definido"];
        const status = true;
        const { code, title, price, description, category, stock } = nuevoProd;
	    const product = await productManager.addProduct(code, title, price, description, category, status, stock, thumbnail);
        const products = await productManager.getProducts();
        socket.emit('products-details', products);
    });
});

//Defino que motor de plantillas voy a usar
app.engine('handlebars', engine());

// Setting de mi app de handlebars
app.set('view engine', 'handlebars'); // Extensión de las vistas
app.set('views', path.resolve(__dirname, './views')); // Ruta de las vistas
app.use('/', express.static(path.join(__dirname, '/public'))) //Unir rutas en una sola concatenandolas
app.use('/realtimeproducts', express.static(path.join(__dirname, '/public')))


//Routes
app.get('/', async (req, res) => {
    const products = await productManager.getProducts();

	if (products) {
        res.render('products', {
            css: "products.css",
            title: "Home",
            products: products
        });

	} else {
		res.status(400).send("Error al cargar productos")
	}

})

app.get('/realtimeproducts', async (req, res) => {
    const products = await productManager.getProducts();

    if (products) {
        res.render('realTimeProducts', {
            css: "style.css",
            title: "Socket",
            products: products,
            js: "realTimeProducts.js"
        });
    } else {
		res.status(400).send("Error al cargar productos")
	}
})


