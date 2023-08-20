import { promises as fs } from 'fs';

const PATH_CARTS = './src/data/carts.json';
const carts = JSON.parse(await fs.readFile(PATH_CARTS, 'UTF-8')); // Leo la info. del archivo JSON

class CartManager {
	constructor() {
		this.path = PATH_CARTS;
		this.carts = null;
	}

	// Obtengo todos los carritos
	async getCarts() {
		return carts;
	}
	
}

class Cart {
	constructor(cant, products) {
		this.id = cant + 1
		products = []
	}

	// Creo el método que obtiene el id sgte.
	async getId() {
        const data = JSON.parse(carts);
        const maxId = data.reduce((max, cart) => (cart.id > max ? cart.id : max), 0);
        return maxId + 1;

	}
}

export default CartManager;