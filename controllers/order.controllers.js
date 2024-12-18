const Order = require('../models/order.model')

// Crea una orden
async function createOrder(req, res) {
    try {
        // Verificar si la orden tiene productos
        if (!req.body.products || req.body.products.length === 0) {
            return res.status(400).send({
                ok: false,
                message: 'La orden no puede estar vacía'
            })
        }

        const order = new Order(req.body)
        const newOrder = await order.save()
        return res.status(201).send({
            ok: true,
            message: 'Orden creada',
            newOrder
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({
            ok: false,
            message: "No se pudo crear la orden"
        })
    }
}

// Devuelve todas las órdenes
async function getOrders(req, res) {
    try {
        const orders = await Order.find()
            .populate('user', "name email")
            .populate('products.product', "name price image")
        return res.status(200).send({
            orders
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            ok: false,
            message: "No se pudo obtener las órdenes"
        })
    }
}

module.exports = {
    createOrder,
    getOrders
}
