const Product = require('../models/product.model')

//Trae todos los productos
async function getProducts(req, res)  {
    try {
        const products = await Product.find()
        console.log(products)
        return res.status(200).send(products)
        
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            ok: false,
            message: "Error al obtener productos"
        })
    }
}

//Crear un producto
async function createProduct(req, res) {
    const product = new Product(req.body)

    try {
        const newProduct = await product.save()
        console.log(newProduct)
        return res.status(201).send(newProduct)
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            ok: false,
            message: "El producto no se pudo crear"
        })
    }
}

//Traer un producto en particular
async function getProductById(req, res) {
    try {
        const { id } = req.params
        const product = await Product.findById(id)

        if (!product) {
            return res.status(404).send({
                ok: false,
                message: "El producto no fue encontrado"
            })
        }

        return res.status(200).send({
            ok: true,
            message: "El producto fue encontrado",
            product
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            ok: false,
            message: "Error al obtener el producto en la DB"
        })
    }
}

//Borrar producto
async function deleteProduct(req, res) {
    try {
        const { id } = req.params
        const deletedProduct = await Product.findByIdAndDelete(id)

        if (!deletedProduct) {
            return res.status(404).send({
                ok: false,
                message: "El producto a borrar no fue encontrado"
            })
        }

        return res.status(200).send({
            ok:true,
            message: "El producto fue borrado correctamente",
            deleteProduct
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            ok:false,
            message: "Error al borrar el producto"
        })
    }
}

//Actualizar un producto
async function updateProduct(req,res) {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true })

        if (!product) {
            return res.status(404).send({
                ok: false,
                message: "Producto no encontrado"
            })
        }

        return res.status(200).send({
            ok: true,
            message: "Producto actualizado correctamente",
            product
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            ok: false,
            message: "Error al actualizar el producto"
        })
    }
}

module.exports = {
    getProducts,
    createProduct,
    getProductById,
    deleteProduct,
    updateProduct
}