const { DataSource } = require("typeorm");
const { Product } = require("../models/models/products");
require ("reflect-metadata");

const AppDataSource = new DataSource({
    type:"mysql",
    host:"localhost",
    port:3306,
    username:"luis",
    password:"123",
    database:"tienda",
    entities:[Product]
});

module.exports= {AppDataSource}