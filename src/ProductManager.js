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

			if (this.allAttributesFilled(product)) {
				products.push(product); // Ingreso el nuevo producto en el array
				await fs.writeFile(this.path, JSON.stringify(products));
				return product;
	
			} else {
				console.log("Todos los campos son obligatorios")
			}
		}
	}

	// Actualizo un producto por su id
	async updateProduct(id, product){
		const products = JSON.parse(await fs.readFile(this.path, 'UTF-8')); // Leo la info. del archivo JSON
		const index = products.findIndex((prod) => prod.id === id);

		// Si el producto existe
		if(index >= 0){
			products[index].title		= product.title;		// Actualizo el valor del title
			products[index].description	= product.description;	// Actualizo el valor del description
			products[index].price		= product.price;		// Actualizo el valor del price
			products[index].thumbnail	= product.thumbnail;	// Actualizo el valor del thumbnail
			products[index].code		= product.code;			// Actualizo el valor del code
			products[index].stock		= product.stock;		// Actualizo el valor del stock

			await fs.writeFile(this.path, JSON.stringify(products));
			console.log(`El producto con id: ${id} ha sido actualizado`);

			return product;

		} else {
			console.log(`El producto con id: ${id} no existe`);
		}
	}

	async deleteProduct(id){
		const products = JSON.parse(await fs.readFile(this.path, 'UTF-8')); // Leo la info. del archivo JSON
		const producto = products.find(prod => prod.id === id);
	
		// Si el producto existe
		if (producto) {
			await fs.writeFile(this.path, JSON.stringify(products.filter(prod => prod.id != id))); // Filtro por el id de producto diferente al id a borrar
			console.log(`El producto con id: ${id} ha sido eliminado`);

			return producto;
		} else {
			console.log(`El producto con id: ${id} no existe`);
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
		const PATH_PRODUCTS = './src/data/products.json';
		const prods = await fs.readFile(PATH_PRODUCTS, 'UTF-8');
        const data = JSON.parse(prods);
        const maxId = data.reduce((max, product) => (product.id > max ? product.id : max), 0);
        return maxId + 1;

	}
}

export default ProductManager;
