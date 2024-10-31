const express = require('express')
const router = express.Router()
const productControllers = require('../controllers/product.controllers')
const upload = require('../middlewares/uploadFile')
const validation = require('../middlewares/auth')
const isAdmin = require('../middlewares/isAdmin')

//Trae los productos desde la DB
router.get("/products", productControllers.getProducts)

//Crea un producto en la DB
router.post("/products", [ validation, isAdmin, upload ], productControllers.createProduct) //añadir isadmin y validation

//Trae un producto específico
router.get("/products/:id", productControllers.getProductById)

//Borrar un producto
router.delete("/products/:id", productControllers.deleteProduct)

//Editar un producto
router.put("/products/:id", [ upload ], productControllers.updateProduct)

module.exports = router