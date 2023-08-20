import { Router } from 'express';
import ProductManager from '../ProductManager.js';

const appRouter = Router();

const PATH_PRODUCTS = './src/data/products.json';
const productManager = new ProductManager(PATH_PRODUCTS);

appRouter.get('/', async (req, res) => {
	const products = await productManager.getProducts();

	if (products) {
		const { limit } = req.query;

		if (/^\d+$/.test(limit)) {
			const productsLimit = +limit;
			const productsRange = products.slice(0, productsLimit);

			return res.status(200).send(productsRange);
		}

		res.status(200).send(products);

	} else {
		res.status(400).send("Error al cargar productos")
	}	
})

appRouter.get('/products/:pid', async (req, res) => {
	const { pid } = req.params;
	const product = await productManager.getProductById(parseInt(pid));
	
	if (!product) {
		return res.status(404).send("EL PRODUCTO NO EXISTE");
	}

	res.status(200).send(product);
})

appRouter.post('/', async (req, res)=> {
	const { code, title, price, description, category, status, stock, thumbnail } = req.body;
	const product = await ProductManager.addProducts(code, title, price, description, category, status, stock, thumbnail);
	
	if (product.success){
	  res.status(200).send(product.message)
	} else {
	  res.status(400).send(product.message)
	}
  });

export default appRouter;