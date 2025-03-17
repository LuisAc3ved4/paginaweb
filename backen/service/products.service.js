const {ProductRepositoty} = require("../repositories/product.repository");

class ProductService{
    async getAll(){
        return await ProductRepositoty.find();
    }
    async getOneBy(id){
        return await ProductRepositoty.findOneBy({id});
    }
    async create(prooduct){
        const newProduct = ProductRepositoty.create(product);
        return await ProductRepositoty.save(newProduct);
    }
    async update(id,data){
        console.log({id,data});2
        await ProductRepositoty.update(id,data);
        return await ProductRepositoty.findOneBy({id});
    }
    async delete(id){
        return await ProductRepositoty.delete({id});
    }

}

module.exports ={ProductService: new ProductService()};