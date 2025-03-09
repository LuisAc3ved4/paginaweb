const { AppDataSource } = require("../data/source");
const { Product } = require("../models/models/products");


const ProductRepository = 
AppDataSource.getRepository(Product);

module.exports = {ProductRepository}