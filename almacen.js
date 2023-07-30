class ProductManager {
    constructor() {
        this.products = []
    }

    addProduct(product) {
        const prod = this.products.find(prod => prod.code === product.code)

        if (prod) {
            console.log("Este producto ya existe")
        } else {
            this.products.push(product)
        }
    }

    getProducts() {
        console.log(this.products)
    }

    getProductById(id) {
        const prod = this.products.find(prod => prod.id === id)

        if (prod) {
            console.log(prod)
        } else {
            console.log("No existe un producto con este Id")
        }
    }
}

class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
        this.id = Product.getId()
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

const prod1 = new Product("Arroz", "Leopardo", 12000, [], "A125", 20)
const prod2 = new Product("Cafe", "Universal", 8000, [], "C200", 30)
const prod3 = new Product("Leche", "Ciledco", 10000, [], "L358", 50)
const prod4 = new Product("Guayaba", "Roja", 3000, [], "G358", 30)

// console.log(prod1)
// console.log(prod2)
// console.log(prod3)

const productManager = new ProductManager()

productManager.addProduct(prod1)
productManager.addProduct(prod2)
productManager.addProduct(prod3)
productManager.addProduct(prod4)

productManager.getProducts()

productManager.getProductById(5)