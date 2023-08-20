import { promises as fs } from 'fs';

const PATH_PRODUCTS = './src/data/products.json';

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
	// async addProduct(product) {
	async addProduct(code, title, price, description, category, status, stock, thumbnail) {
		const products = JSON.parse(await fs.readFile(this.path, 'UTF-8')); // Leo la info. del archivo JSON

		// Valido si existe el cod. de producto
		const prod = products.find((prd) => prd.code === code)

		// Si el producto existe
		if (prod)
			console.log("El producto ya existe en el almacén");

		else {
			// Obtengo el número de productos
			const cant = products.reduce((max, product) => (product.id > max ? product.id : max), 0);
			// Instancio la clase Producto
			const product = new Product(cant, code, title, price, description, category, status, stock, thumbnail);
			console.log(product);
			if (this.allAttributesFilled(product)) {
				products.push(product); // Ingreso el nuevo producto en el array
				await fs.writeFile(this.path, JSON.stringify(products));
				return product;
	
			} else {
				console.log("Todos los campos son obligatorios")
			}
		}
	}
}

class Product {
	constructor(cant, code, title, price, description, category, status, stock, thumbnail) {
		this.id = cant + 1
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
	async getId() {
		const prods = await fs.readFile(PATH_PRODUCTS, 'UTF-8');
        const data = JSON.parse(prods);
        const maxId = data.reduce((max, product) => (product.id > max ? product.id : max), 0);
        return maxId + 1;

		// if (this.nextId) {
		// 	this.nextId++

		// } else {
		// 	this.nextId = 1
		// }

		// return this.nextId
	}
}

export default ProductManager;
