import express from 'express';
// import productRouter from './routes/products.routes.js';
// import cartRouter from './routes/cart.routes.js';
import { engine } from 'express-handlebars';
import { __dirname } from './path.js';
import path from 'path';
import { Server } from 'socket.io';

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
        // console.log(user.rol);
        if (user.rol === "Admin") {
            socket.emit("credencialesConexion", "Usuario Válido");

        } else {
            socket.emit("credencialesConexion", "Usuario No Válido");
        }
    });

    socket.on('nuevoProducto', (nuevoProd) => {
        // console.log('nuevoProd', nuevoProd) // ok
        prods.push(nuevoProd);          // Agrego el nuevo producto en el array de productos
        // console.log('prods', prods) // ok
        socket.emit('prods', prods);    // Devuelvo el array actualizado
    });
});

//Defino que motor de plantillas voy a usar
app.engine('handlebars', engine());

// Setting de mi app de handlebars
app.set('view engine', 'handlebars'); // Extensión de las vistas
app.set('views', path.resolve(__dirname, './views')); // Ruta de las vistas
app.use('/static', express.static(path.join(__dirname, '/public'))) //Unir rutas en una sola concatenandolas
app.use('/realtimeproducts', express.static(path.join(__dirname, '/public')))


//Routes
// app.use('/api/product', productRouter);
// app.use('/api/cart', cartRouter);

app.get('/static', (req, res) => {
    res.render('realTimeProducts', {
        css: "style.css",
        title: "Home",
        js: "realTimeProducts.js"
    });
})


