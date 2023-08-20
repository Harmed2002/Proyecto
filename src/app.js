import express from 'express';
import productRouter from './routes/products.routes.js';
import cartRouter from './routes/cart.routes.js';
// import ProductManager from './ProductManager.js';

const PORT = 8080;
// const PATH_PRODUCTS = './data/products.json';
// const productManager = new ProductManager(PATH_PRODUCTS);

const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Routes
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);


app.listen(PORT, () => { console.log(`Servidor online en el puerto ${PORT}`) });
