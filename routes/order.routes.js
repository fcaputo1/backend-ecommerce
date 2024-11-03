const orderControllers = require('../controllers/order.controllers')
const validation = require('../middlewares/auth')

const router = require('express').Router()

//Obtener todas las ordenes
router.get("/orders", validation, orderControllers.getOrders)

//Crear orden
router.post("/orders", validation, orderControllers.createOrder)

module.exports = router