import { Router } from 'express';
import ProductManager from '../ProductManager.js';

const productRouter = Router();
const PATH_PRODUCTS = './src/data/products.json';
const productManager = new ProductManager(PATH_PRODUCTS);

// Mostrar todos los productos
productRouter.get('/', async (req, res) => {
	const products = await productManager.getProducts();

	if (products) {
		const { limit } = req.query;

		if (/^\d+$/.test(limit)) {
			const productsLimit = +limit;
			const productsRange = products.slice(0, productsLimit);

			return res.status(200).send(productsRange);
		}

		res.status(200).send(products);

	} else {
		res.status(400).send("Error al cargar productos")
	}	
})

// Mostrar un producto por id
productRouter.get('/:pid', async (req, res) => {
	const { pid } = req.params;
	const product = await productManager.getProductById(parseInt(pid));
	
	if (!product) {
		return res.status(404).send("EL PRODUCTO NO EXISTE");
	}

	res.status(200).send(product);
})

// Inserción de producto
productRouter.post('/', async (req, res)=> {
	const { code, title, price, description, category, status, stock, thumbnail } = req.body;

	const product = await productManager.addProduct(code, title, price, description, category, status, stock, thumbnail);

	if (!product){
		return res.status(400).send("Error el ingresar producto")
	}

	res.status(200).send("Producto ingresado")

});

// Actualización de un producto
productRouter.put('/:pid', async (req, res)=> {
	const {pid} = req.params;
	const proData = req.body;
	const product = await productManager.updateProduct(parseInt(pid), proData);
  
	if(!product){
		return res.status(400).send("Error el actualizar producto");
	}
	
	res.status(200).send("Producto actualizado");
})

// Eliminación de un producto
productRouter.delete('/:pid', async (req, res)=> {
	const {pid} = req.params;
	const product = await productManager.deleteProduct(parseInt(pid));
  
	if(!product){
		res.status(400).send("Error el eliminar producto")
	}
	
	return res.status(200).send("Producto eliminado")
  })

export default productRouter;