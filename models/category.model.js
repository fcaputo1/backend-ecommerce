const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Esquema para modelo de categorías

const categorySchema = new Schema({
    name: { type: String, required: true },
    viewValue: { type: String, required: true },
    description: { type: String }
})

module.exports = mongoose.model('Category', categorySchema)