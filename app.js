const express = require('express')
const app = express()
const User = require('./models/user.model')

//Habilitamos método JSON para poder leer los datos del body
app.use(express.json())

app.get("/users", (req, res) => {
    return res.send("Obteniendo usuarios")
})

//Guarda usuarios en la DB
app.post("/users", (req, res) => {

    const user = new User(req.body)

    console.log(user);

    user.save().then((newUser) => {

        console.log(newUser);
        return res.send("El usuario se ha creado correctamente")

    }).catch((error) => {

        console.log(error)
        return res.send("El usuario no se pudo crear")

    })
})

module.exports = app