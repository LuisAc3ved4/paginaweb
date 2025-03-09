const { EntitySchema } = require("typeorm");

const Product = new EntitySchema({
    name: "Product",
    tableName:"productos",
    columns:{
        id:{
            primary: true,
            type:"int",
            generated: true,
        },
        nombre:{
            type:"varchar",
            length: 255,
        },
        precio:{
            type:"decimal",
            precision:10,
            scale:2,
        },
        stock:{
            type:"int"
        },
        }
});

module.exports = {Product}