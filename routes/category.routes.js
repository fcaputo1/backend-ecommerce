const router = require('express').Router()
const categoryController = require('../controllers/category.controllers')

//Obtener todas las categorías
router.get('/categories', categoryController.getCategories)

//Definir categoría
router.post('/categories', categoryController.createCategory)

module.exports = router