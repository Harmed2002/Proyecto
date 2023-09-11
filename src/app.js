import express from 'express';
import { engine } from 'express-handlebars';
import { __dirname } from './path.js';
import path from 'path';
import productRouter from './routes/products.routes.js';
import mongoose from 'mongoose';

const PORT = 8000;
const app = express();

// Establezco la conección a Mongoose
mongoose.connect('mongodb+srv://harmed2002:3gEGKitALiASCMSH@cluster0.0kdtqxd.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log("BDD conectada!"))
    .catch(() => console.log("Error en conexión a BDD"));

// Subo el servidor Express
// const serverExpress = app.listen(PORT, () => { console.log(`Servidor online en el puerto ${PORT}`) });
app.listen(PORT, () => { console.log(`Servidor online en el puerto ${PORT}`) });

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, '/public'))); // Defino la ruta para los archivos estáticos

//Defino que motor de plantillas voy a usar
app.engine('handlebars', engine());

// Setting de mi app de handlebars
app.set('view engine', 'handlebars'); // Extensión de las vistas
app.set('views', path.resolve(__dirname, './views')); // Ruta de las vistas
app.use('/', express.static(path.join(__dirname, '/public'))) //Unir rutas en una sola concatenandolas
// app.use('/realtimeproducts', express.static(path.join(__dirname, '/public')))


// Routes
app.use('/api/products', productRouter);

