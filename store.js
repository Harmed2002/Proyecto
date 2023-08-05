import { promises as fs } from 'fs';

const path = './products.json'; // Ruta de ubicación del archivo JSON
const products = JSON.parse(await fs.readFile(path, 'UTF-8')); // Leo la info. del archivo JSON

const getProducts = async () => {
	console.log(products);
}

const getProductById = async (id) => {
	const producto = products.find(prod => prod.id === id);

	// Si el producto existe
	if (producto)
		console.log(producto);
	else
		console.log(`El producto con id: ${id} no existe`);
}

const addProduct = async (product) => {
	const prod = products.find(prod => prod.id === product.id);

	// Si el producto existe
	if (prod)
		console.log("El producto ya existe en el almacén");
	else {
		products.push(product); // Ingreso el nuevo producto en el array
		await fs.writeFile(path, JSON.stringify(products));
	}
}

const updateProduct = async (id, product) => {
	const index = products.findIndex(prod => prod.id === id); // Busco la posición del elemento

	// Si el producto existe
	if (index >= 0) {
        products[index].title		= product.title;		// Actualizo el valor del title
        products[index].description	= product.description;	// Actualizo el valor del description
        products[index].price		= product.price;		// Actualizo el valor del price
        products[index].thumbnail	= product.thumbnail;	// Actualizo el valor del thumbnail
        products[index].code		= product.code;			// Actualizo el valor del code
        products[index].stock		= product.stock;		// Actualizo el valor del stock

		await fs.writeFile(path, JSON.stringify(products));
		console.log(`El producto con id: ${id} ha sido actualizado`);
	} else {
		console.log(`El producto con id: ${id} no existe`);
	}
}

const deleteProduct = async (id) => {
	const producto = products.find(prod => prod.id === id);

	// Si el producto existe
	if (producto) {
		await fs.writeFile(path, JSON.stringify(products.filter(prod => prod.id != id))); // Filtro por el id de producto diferente al id a borrar
		console.log(`El producto con id: ${id} ha sido eliminado`);
	} else {
		console.log(`El producto con id: ${id} no existe`);
	}
}


export { getProducts, getProductById, addProduct, updateProduct, deleteProduct };