const productsService = require("../service/products.service")

class ProductController{
    static async getAll(req,res){
        try{
            const products = await productsService.getAll();
            res.status(200).json(products);
        } catch (error){
            res.status(500).json({message:error.message || "Ocurrio un \
                error al leer los datos. Intenta de nueco mas tarde"});
        }
    }
    static async getOneById(req,res){
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: "ID no proporcionado." });
            }

            const product = await productsService.getOneById(id);
            if (!product) {
                return res.status(404).json({ message: "Producto no encontrado." });
            }

            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({ message: error.message || "Ocurrió un error al obtener el producto." });
        }
    }
    

    static async create(req,res){
        try {
            const productData = req.body;
            if (!productData || Object.keys(productData).length === 0) {
                return res.status(400).json({ message: "Datos del producto no proporcionados." });
            }

            const newProduct = await productsService.create(productData);
            res.status(201).json(newProduct);
        } catch (error) {
            res.status(500).json({ message: error.message || "Ocurrió un error al crear el producto." });
        }

    }

    static async update(req,res){
        try {
            const { id } = req.params;
            const productData = req.body;

            if (!id || !productData || Object.keys(productData).length === 0) {
                return res.status(400).json({ message: "ID o datos del producto no proporcionados." });
            }

            const updatedProduct = await productsService.update(id, productData);
            if (!updatedProduct) {
                return res.status(404).json({ message: "Producto no encontrado." });
            }

            res.status(200).json(updatedProduct);
        } catch (error) {
            res.status(500).json({ message: error.message || "Ocurrió un error al actualizar el producto." });
        }

    }

    static async delete(req,res){
        try {
            const { id } = req.params;
            if (!id) {
                return res.status(400).json({ message: "ID no proporcionado." });
            }

            const deletedProduct = await productsService.delete(id);
            if (!deletedProduct) {
                return res.status(404).json({ message: "Producto no encontrado." });
            }

            res.status(204).json(result); 
        } catch (error) {
            res.status(500).json({ message: error.message || "Ocurrió un error al eliminar el producto." });
        }

    }

}

module.exports = {ProductController}


