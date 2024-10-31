const express = require('express')
const app = express()
const userRoutes = require('./routes/user.routes')
const productRoutes = require('./routes/product.routes')
const cors = require('cors')
const categoryRoutes = require('./routes/category.routes')

//Habilitamos uso de los CORS
app.use(cors())

//Comparto carpeta publica
app.use( express.static('public') )

//Habilitamos método JSON para poder leer los datos del body
app.use(express.json())

app.use([ userRoutes, productRoutes, categoryRoutes ])

module.exports = app