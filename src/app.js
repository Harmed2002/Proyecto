import express from 'express';
import ProductManager from './ProductManager.js';

const PATH_PRODUCTS = './src/data/products.json';
const PORT = 4000;

const productManager = new ProductManager(PATH_PRODUCTS);

const app = express();

app.get('/products', async (req, res) => {
	const products = await productManager.getProducts();
	const { limit } = req.query;

	if (/^\d+$/.test(limit)) {
		const productsLimit = +limit;
		const productsRange = products.slice(0, productsLimit);
		
		return res.send(productsRange);
	}

	res.send(products);
})

app.get('/products/:pid', async (req, res) => {
	const { pid } = req.params;
	const product = await productManager.getProductById(parseInt(pid));
	
	if (!product) {
		return res.status(404).send("EL PRODUCTO NO EXISTE");
	}

	res.send(product);
})

app.listen(PORT, () => { console.log(`Servidor online en el puerto ${PORT}`) });
