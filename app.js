const express = require('express')
const app = express()
const userRoutes = require('./routes/user.routes')

//Habilitamos método JSON para poder leer los datos del body
app.use(express.json())

app.use([ userRoutes ])

module.exports = app