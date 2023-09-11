import { Router } from 'express';
import { productModel } from '../models/products.models.js';

const productRouter = Router();

// Mostrar todos los productos
productRouter.get('/', async (req, res) => {
	try {
		const products = await productModel.find();

		if (products)
			res.status(200).send({respuesta: 'OK', mensaje: products});
		else
			res.status(404).send({respuesta: 'Error al consultar productos', mensaje: 'Not Found'});

	} catch (error) {
		res.status(400).send({respuesta: 'Error', mensaje: error});
	}

})

// Mostrar un producto por id
productRouter.get('/:id', async (req, res) => {
	const {id} = req.params;

	try {
		const product = await productModel.findById(id);

		if (product)
			res.status(200).send({respuesta: 'OK', mensaje: product});
		else
			res.status(404).send({respuesta: 'Error al consultar producto', mensaje: 'Not Found'});

	} catch (error) {
		res.status(400).send({respuesta: 'Error', mensaje: error});
	}

})

// Grabar un producto
productRouter.post('/', async (req, res) => {
	const { code, title, price, description, category, status, stock } = req.body;

	try {
		const respuesta = await productModel.create({ code, title, price, description, category, status, stock });

		if (products)
			res.status(200).send({respuesta: 'OK', mensaje: respuesta});
		else
			res.status(404).send({respuesta: 'Error al grabar un producto', mensaje: 'Not Found'});

	} catch (error) {
		res.status(400).send({respuesta: 'Error', mensaje: error});
	}

})

// Actualizar un producto
productRouter.put('/:id', async (req, res) => {
	const {id} = req.params;
	const { code, title, price, description, category, status, stock } = req.body;

	try {
		const product = await productModel.findByIdAndUpdate(id, { code, title, price, description, category, status, stock });

		if (product)
			res.status(200).send({respuesta: 'OK', mensaje: product});
		else
			res.status(404).send({respuesta: 'Error al actualizar un producto', mensaje: 'Not Found'});

	} catch (error) {
		res.status(400).send({respuesta: 'Error', mensaje: error});
	}

})

// Borrar un producto
productRouter.delete('/:id', async (req, res) => {
	const {id} = req.params;

	try {
		const product = await productModel.findByIdAndDelete(id);

		if (product)
			res.status(200).send({respuesta: 'OK', mensaje: product});
		else
			res.status(404).send({respuesta: 'Error al eliminar un producto', mensaje: 'Not Found'});

	} catch (error) {
		res.status(400).send({respuesta: 'Error', mensaje: error});
	}

})

export default productRouter;