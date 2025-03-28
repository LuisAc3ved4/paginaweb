const { ProductService } = require("../service/products.service")

class ProductController{
    static async getAll(req,res){
        try {
            const products = await ProductService.getAll();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({message:error.message || "Ocurrio un error al leer los datos. Intenta de nuevo mas tarde"});
        }
    }
    static async getOneById(req,res){
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: "ID de producto es requerido" });
            }
            const product = await ProductService.getOneBy(id);
            if (!product) {
                return res.status(404).json({ message: "Producto no encontrado" });
            }
            res.json(product);
        } catch (error) {
            res.status(500).json({ message: "Error al obtener el producto", error });
        }

    }
    static async create(req,res){
        try {
            const body = req.body;
            if (!body.nombre || !body.precio || !body.stock){
                return res.status(400).json({ message: "Todos los campos son requeridos" });
            }
            const newProduct = await ProductService.create(req.body);
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json({ message: "Error al crear el producto", error });
        }

    }
    static async update(req,res){
        try {
            const { id } = req.params;
            const body = req.body;
            if (!body.nombre || !body.precio || !body.stock && !id){
                return res.status(400).json({ message: "se necesita el id y un campo valido para actualizar" });
            }
            const updatedProduct = await ProductService.update(id, req.body);
            if (!updatedProduct) {
                return res.status(404).json({ message: "Producto no encontrado" });
            }
            res.status(200).json(updatedProduct);
        } catch (error) {
            res.status(500).json({ message: "Error al actualizar el producto", error });
        }
    }
    static async delete(req,res){
        try {
            const { id } = req.params;
            if (!id){
                return res.status(400).json({ message: "ID de producto es requerido" });
            }
            const result = await ProductService.delete(id);
            if (result.affected === 0) {
                return res.status(404).json({ message: "Producto no encontrado" });
            }
            res.status(204).json(result);
        } catch (error) {
            res.status(500).json({ message: "Error al eliminar el producto", error });
        }
    }
}

module.exports = {ProductController}