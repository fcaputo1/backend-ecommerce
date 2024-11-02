const Order = require('../models/order.model')

async function createOrder (req,res) {
    try {
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

async function getOrders(req,res) {
    try {
        const orders = await Order.find().populate('user', "name email").populate('products.product', "name price image")
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