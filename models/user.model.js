const mongoose = require('mongoose')
const Schema = mongoose.Schema

//Definimos el esquema del modelo

const userSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    birthday: { type: String },
    country: { type: String },
    avatar: { type: String },
    observations: { type: String }
})

module.exports = mongoose.model("User", userSchema)