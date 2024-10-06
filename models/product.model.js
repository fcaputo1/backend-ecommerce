const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Esquema para modelo de producto

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 80
    },
    price: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ["Autos de Lujo", "Auto Deportivo", "Super Deportivo"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    image: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model("Product", productSchema)