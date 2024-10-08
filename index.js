require('dotenv').config()
const PORT = process.env.PORT
const mongoose = require('mongoose')
const app = require('./app')
const reset = "\x1b[0m"

const DATABASE_URL = process.env.MONGO_URI

mongoose.connect(DATABASE_URL).then(() => {

    console.log(`\x1b[35mConexion a la DB exitosa ${reset}`)

    app.listen(PORT, () => {
        console.log(`\x1b[33mServer is running on port ${PORT} ${reset}`);
    })

}).catch(error => console.log("Error al conectar la DB", error))