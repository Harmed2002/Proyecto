import * as st from './store.js';

class ProductManager {
	constructor() {
		this.products = []
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
	addProduct(product) {
		const prod = this.products.find(prod => prod.code === product.code)

		if (this.allAttributesFilled(product)) {
			st.addProduct(product);
		} else {
			console.log("Todos los campos son obligatorios")
		}
	}

	// Obtengo los productos
	getProducts() {
		st.getProducts();
	}

	// Obtengo un producto por su id
	getProductById(id) {
		st.getProductById(id);
	}

	// Actualizo un producto por su id
	updateProduct(id, product) {
		st.updateProduct(id, product);
	}

	deleteProduct(id) {
		st.deleteProduct(id);
	}
}

class Product {
	constructor(title, description, price, thumbnail, code, stock) {
		this.id = Product.getId()
		this.title = title
		this.description = description
		this.price = price
		this.thumbnail = thumbnail
		this.code = code
		this.stock = stock
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

// const prod1 = new Product("Pan", "Ocañero", 12000, [], "A125", 20)
// const prod2 = new Product("Cafe", "Universal", 8000, [], "C200", 30)
// const prod3 = new Product("Leche", "Ciledco", 10000, [], "L358", 50)
// const prod4 = new Product("Guayaba", "Roja", 3000, [], "G358", 30)

const productManager = new ProductManager()

// productManager.addProduct(prod1)
// productManager.addProduct(prod2)
// productManager.addProduct(prod3)
// productManager.addProduct(prod4)

// productManager.getProducts()

// productManager.getProductById(1)

// productManager.updateProduct(15, { "title":"Pan Ocañero","description":"Pan Ocañero","price":12000,"thumbnail":[],"code":"A125","stock":20 })

// productManager.deleteProduct(3)