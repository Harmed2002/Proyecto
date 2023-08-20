import { promises as fs } from 'fs';

class ProductManager {
	constructor(pathProducts) {
		this.path = pathProducts;
		this.products = null;
	}

	// Obtengo todos los productos
	async getProducts() {
		const products = JSON.parse(await fs.readFile(this.path, 'UTF-8')); // Leo la info. del archivo JSON

		return products;
	}

	// Obtengo un producto por su ID
	async getProductById(id) {
		const products = JSON.parse(await fs.readFile(this.path, 'UTF-8')); // Leo la info. del archivo JSON
		const product = products.find(product => product.id === id)
		
		if (!product) {
			console.error('El Producto no existe');
		}
		
		return product;
	}

	// Verifico que todos los campos esten llenos
	allAttributesFilled(product) {
		for (const attr in product) {
			if (!product[attr]) {
				console.log(product[attr]);
				return false;
			}
		}
		return true;
	}

	// Ingreso un nuevo producto
	async addProduct(product) {
		const prod = this.products.find(prod => prod.code === product.code)

		// Si el producto existe
		if (prod)
			console.log("El producto ya existe en el almacén");

		else {
			if (this.allAttributesFilled(prod)) {
				products.push(prod); // Ingreso el nuevo producto en el array
				await fs.writeFile(this.path, JSON.stringify(products));
	
			} else {
				console.log("Todos los campos son obligatorios")
			}
		}
	}
}

class Product {
	constructor(code, title, price, description, category, status, stock, thumbnail) {
		this.id = Product.getId()
		this.code = code
		this.title = title
		this.price = price
		this.description = description
		this.category = category
		this.status = status
		this.stock = stock
		this.thumbnail = thumbnail
	}

	// Creo el método que obtiene el id sgte.
	static getId() {
		if (this.nextId) {
			this.nextId++

		} else {
			this.nextId = 1
		}

		return this.nextId
	}
}

export default ProductManager;
