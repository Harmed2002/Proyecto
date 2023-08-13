import { promises as fs } from 'fs';

class ProductManager {
	constructor(pathProducts) {
		this.path = pathProducts;
		this.products = null;
	}

	async getProducts() {
		const products = JSON.parse(await fs.readFile(this.path, 'UTF-8')); // Leo la info. del archivo JSON

		return products;
	}

	async getProductById(id) {
		const products = JSON.parse(await fs.readFile(this.path, 'UTF-8')); // Leo la info. del archivo JSON
		const product = products.find(product => product.id === id)
		
		if (!product) {
			console.error('El Producto no existe');
		}
		
		return product;
	}

}

export default ProductManager;
