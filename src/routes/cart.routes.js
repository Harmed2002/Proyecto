import { Router } from "express";
import CartManager from '../CartManager.js';

const cartRouter = Router();
const PATH_CARTS = '../data/carts.json';
const cartManager = new CartManager(PATH_CARTS);

// Mostrar todos los carritos
cartRouter.get('/', async (req, res) => {
	const carts = await cartManager.getCarts();

	if (carts) {
		const { limit } = req.query;

		if (/^\d+$/.test(limit)) {
			const cartsLimit = +limit;
			const cartsRange = carts.slice(0, cartsLimit);

			return res.status(200).send(cartsRange);
		}

		return res.status(200).send(carts);

	}

	res.status(400).send("Error al cargar productos");	
})

// Crea un nuevo carrito
cartRouter.post('/', async (req, res) => {
	const newCart = await cartManager.addNewCart();
	
	if (!newCart) {
		return res.status(400).send("Ocurrió un error al crear el carrito");
	}

	res.status(200).send(newCart);
});

// Listar productos por id de carrito
cartRouter.get("/:cid", async (req, res) => {
	const { cid } = req.params;
  
	const cart = await cartManager.getCartById(parseInt(cid));
  
	if (!cart) {
	  return res.status(404).send("El carrito no existe");
	}
	
	const productsInCart = cart.products;
	return res.status(200).send(productsInCart);
});

// Agregar un producto a un carrito por su id
cartRouter.post("/:cid/product/:pid", async (req, res) => {
	const { cid, pid } = req.params;
	const { quantity } = req.body;
  
	const prod = await cartManager.addProductToCart(cid, pid, quantity);
  
	if (!prod) {
	  	return res.status(404).send("Error al agregar producto al carrito");
	}
	
	res.status(200).send(`Producto con id: ${pid} agregado al carrito con id: ${cid}`);
});


export default cartRouter;