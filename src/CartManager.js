import { promises as fs } from 'fs';

const PATH_CARTS = './src/data/carts.json';
const carts = JSON.parse(await fs.readFile(PATH_CARTS, 'UTF-8')); // Leo la info. del archivo JSON
const PATH_PRODUCTS = './src/data/products.json';
const products = JSON.parse(await fs.readFile(PATH_PRODUCTS, 'UTF-8')); // Leo la info. del archivo JSON

class CartManager {
	constructor() {
		this.path = PATH_CARTS;
		this.carts = null;
	}

	// Obtengo todos los carritos
	async getCarts() {
		return carts;
	}

	// Obtengo un carrito por su ID
	async getCartById(id) {
		const cart = carts.find(cart => cart.id === id)
		
		if (!cart) {
			console.error('El carrito no existe');
		}
		
		return cart;
	}

	// Crea un nuevo carrito de compras
	async addNewCart() {
		// Obtengo el número de carritos
		const cant = carts.reduce((max, cart) => (cart.id > max ? cart.id : max), 0);

		// Instancio la clase Cart
		const products = [];
		const cart = new Cart(cant, products);

		carts.push(cart);

		await fs.writeFile(PATH_CARTS, JSON.stringify(carts));
	
		return cart;
	}

	// Agrega un producto al carrito de compras
	async addProductToCart(cartId, productId, quantity) {
		let product = {};
		try {
			// Verifico si existe el carrito cartId
			const cartIndex = carts.findIndex(
				(cart) => parseInt(cart.id) === parseInt(cartId)
			);

			if (cartIndex === -1) {
				console.error("El carrito no existe");
				return false;
			}

			// Verifico si existe el producto en la lista general de productos
			const productIndex = products.findIndex(
				(prod) => parseInt(prod.id) === parseInt(productId)
			);

			if (productIndex === -1) {
				console.error("El producto no existe");
				return false;
			}

			// Verifico si el producto existe en el carrito seleccionado
			product = carts[cartIndex].products.find(
				(prod) => parseInt(prod.id) === parseInt(productId)
			);

			if (product) {
				console.log("Producto ya está en el carrito:", product);
				product.quantity += parseInt(quantity);

			} else {
				console.log("Nuevo producto al carrito.");
				product = {id: parseInt(productId), quantity: parseInt(quantity)}
				carts[cartIndex].products.push(product);
			}

			await fs.writeFile(PATH_CARTS, JSON.stringify(carts));
			return product;

		} catch (error) {
			console.error("Error al agregar el producto:", error);
			return false;
		}
	}
	
}

class Cart {
	constructor(cant, products) {
		this.id = cant + 1
		this.products = products
	}
}

export default CartManager;