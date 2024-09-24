const express = require('express')
const app = express()
const PORT = 3000
const mongoose = require('mongoose')

const DATABASE_URL = "mongodb+srv://franciscocaputo:81zNztcE7eH8nplu@ecommerce.ouerw.mongodb.net/"

mongoose.connect(DATABASE_URL).then(() => {

    console.log("Conexion a la DB exitosa")

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })

}).catch(error => console.log("Error al conectar la DB", error))