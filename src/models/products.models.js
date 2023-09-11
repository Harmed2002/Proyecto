import { Schema, model } from "mongoose";

const productSchema = new Schema({
	code: {
		type: String,
		required: true,
		unique: true
	},
	title: {
		type: String,
		required: true
	},
	price: Number,
	description: String,
	category: String,
	status: {
		type: Boolean,
		default: true},
	stock: Number
})

export const productModel = model('products', productSchema); // Param1: nombre collection, Param2: nombre schema