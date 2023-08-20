import { Router } from "express";
import CartManager from '../CartManager.js';

const cartRouter = Router();
const PATH_CARTS = '../data/carts.json';
const cartManager = new CartManager(PATH_CARTS);

cartRouter.get('/:cid', async (req, res) => {
	const { id } = req.params;
	const product = await cartManager.getCartById(parseInt(id));

	if (product.success) {
		res.status(200).send(product.message)
	} else {
		res.status(400).send(product.message)
	}
});

// Crea un nuevo carrito
cartRouter.post('/', async (req, res) => {
	const products = await cartManager.addProducts();
	if (products.success) {
		res.status(200).send(products.message)
	} else {
		res.status(400).send("Ha ocurrido un error.")
	}
});


export default cartRouter;