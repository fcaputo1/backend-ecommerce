const Product = require('../models/product.model')

//Trae todos los productos
async function getProducts(req, res) {
    try {
        const products = await Product.find()
        console.log(products)
        return res.status(200).send(products)

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            ok: false,
            message: "Error al obtener los productos"
        })
    }
}

//Crear un producto
async function createProduct(req, res) {
    const product = new Product(req.body)

    if (req.file) {
        product.image = req.file.filename
    }

    try {
        const newProduct = await product.save()
        console.log(newProduct)
        return res.status(201).send({
            message: "Producto creado correctamente",
            product: newProduct
        })
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
        const {
            id
        } = req.params
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
        const {
            id
        } = req.params
        const deletedProduct = await Product.findByIdAndDelete(id)

        if (!deletedProduct) {
            return res.status(404).send({
                ok: false,
                message: "El producto a borrar no fue encontrado"
            })
        }

        return res.status(200).send({
            ok: true,
            message: "El producto fue borrado correctamente",
            deletedProduct
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            ok: false,
            message: "Error al borrar el producto"
        })
    }
}

//Actualizar un producto
async function updateProduct(req, res) {
    try {
        const { id: _id } = req.params;

        // Si hay una imagen nueva en la solicitud, la agrega a req.body
        if (req.file) {
            req.body.image = req.file.filename
        }

        // Realizar la actualización del producto con la nueva imagen (si existe) y otros datos
        const updatedProduct = await Product.findByIdAndUpdate(_id, req.body, {
            new: true
        });

        if (!updatedProduct) {
            return res.status(404).send({
                ok: false,
                message: "Producto no encontrado"
            });
        }

        return res.status(200).send({
            ok: true,
            message: "Producto actualizado correctamente",
            product: updatedProduct
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            ok: false,
            message: "Error al actualizar el producto"
        });
    }
}

module.exports = {
    getProducts,
    createProduct,
    getProductById,
    deleteProduct,
    updateProduct
}