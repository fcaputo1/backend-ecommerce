const PORT = 3000
const mongoose = require('mongoose')
const app = require('./app')

const DATABASE_URL = "mongodb+srv://franciscocaputo:81zNztcE7eH8nplu@ecommerce.ouerw.mongodb.net/ecommerce"

mongoose.connect(DATABASE_URL).then(() => {

    console.log("Conexion a la DB exitosa")

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    })

}).catch(error => console.log("Error al conectar la DB", error))