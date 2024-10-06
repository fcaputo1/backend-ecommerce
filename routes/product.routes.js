const express = require('express')
const router = express.Router()
const productControllers = require('../controllers/product.controllers')

//Trae los productos desde la DB
router.get("/products", productControllers.getProducts)

//Crea un producto en la DB
router.post("/products", productControllers.createProduct)

//Trae un producto específico
router.get("/products/:id", productControllers.getProductById)

//Borrar un producto
router.delete("/products/:id", productControllers.deleteProduct)

//Editar un producto
router.put("/products/:id", productControllers.updateProduct)

module.exports = router